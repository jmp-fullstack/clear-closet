import requests
import pandas as pd
import re

# attribute_{숫자} 형식을 goodsAttributes로 변경하는 함수
def replace_attribute_key(option_key):
    if re.match(r'attribute_\d+', option_key):
        return 'goodsAttributes'
    return option_key

def main():
    # Musinsa API로부터 카테고리 데이터 수집
    url = "https://display.musinsa.com/display/api/v2/category-menu?gf=A"
    res = requests.get(url)
    if res.status_code == 200:  # get requests가 제대로 요청 완료된 경우에만 아래의 코드 진행함
        musinsa_data = res.json()['data']['menuItems']  # 상위 및 하위 카테고리 수집을 위함

        # 카테고리 수집
        category_point_url = []  # 카테고리 리스트 [(상위카테고리, 하위카테고리, 하위카테고리명), ...]
        for i in range(3):  # 상위 카테고리 중 [상의, 아우터, 바지]까지만 수집
            menugroups = musinsa_data[i]['menuGroups'][0]['menuItems']
            for j in range(2, len(menugroups)):  # [** 전체, ** 신상] 제외하고, 하위 카테고리 수집
                category_point_url.append((menugroups[j]['landingUrl'].split('/')[-1][:3], menugroups[j]['landingUrl'].split('/')[-1][3:], menugroups[j]['title']))
        for k in range(2):  # 상위 카테고리 중 [원피스/스커트] 수집
            menugroups = musinsa_data[3]['menuGroups'][k]['menuItems']
            for j in range(2, len(menugroups)):  # [** 전체, ** 신상] 제외하고, 하위 카테고리 수집
                category_point_url.append((menugroups[j]['landingUrl'].split('/')[-1][:3], menugroups[j]['landingUrl'].split('/')[-1][3:], menugroups[j]['title']))

        # 카테고리 테이블 생성
        cat_table = pd.DataFrame(category_point_url, columns=['high_cat', 'low_cat', 'low_cat_name'])

    # total_dict 생성
    total_dict = {}
    for i in range(len(category_point_url)):
        high_cat_code, low_cat_code, category_name = category_point_url[i]
        json_data = requests.get(f'https://display.musinsa.com/display/api/v2/categories/ITEM/goods/filter/detail?siteKindId=musinsa&sex=A&originalYn=N&sendLog=true&kidsYn=N&categoryCode={high_cat_code}{low_cat_code}').json()

        category_data = []
        for j in range(len(json_data['data'])):
            key = json_data['data'][j]['key']
            displayText = json_data['data'][j]['displayText']

            # 중복 제거를 위해 set 사용
            filter_contents = set()
            for k in range(len(json_data['data'][j]['filterContents'])):
                code = json_data['data'][j]['filterContents'][k]['code']
                name = json_data['data'][j]['filterContents'][k]['name']
                if name:  # 빈 문자열이 아닌 경우에만 추가
                    filter_contents.add((code, name))

            # set을 다시 리스트로 변환하여 저장
            category_data.append({(key, displayText): list(filter_contents)})

        category_data = [item for item in category_data if list(item.values())[0]]  # 빈 리스트이거나 빈 문자열인 경우 제거

        total_dict[category_point_url[i]] = category_data

    # total_dict를 데이터프레임으로 변환
    rows = []

    for (high_cat_code, low_cat_code, category_name), category_data in total_dict.items():
        for item in category_data:
            for (key, displayText), values in item.items():
                for code, name in values:
                    row = {
                        'high_cat': high_cat_code,
                        'low_cat': low_cat_code,
                        'low_cat_name': category_name,
                        'option_key': key,
                        'display_name': displayText,
                        'option_code': code,
                        'option_name': name
                    }
                    rows.append(row)

    # 옵션 테이블 생성
    option_table = pd.DataFrame(rows)

    # cat_table에 고유 인덱스 추가
    cat_table = cat_table.reset_index().rename(columns={'index': 'cat_id'})

    # option_table과 cat_table을 high_cat, low_cat, low_cat_name으로 매칭
    option_table = option_table.merge(cat_table[['cat_id', 'high_cat', 'low_cat', 'low_cat_name']], on=['high_cat', 'low_cat', 'low_cat_name'], how='left')

    # option_table에 고유 인덱스 추가
    option_table = option_table.reset_index().rename(columns={'index': 'option_id'})

    # 필요 없는 열 삭제
    option_table = option_table.drop(columns=['high_cat', 'low_cat', 'low_cat_name'])

    # apply 함수를 사용하여 option_key 열의 값을 변경
    option_table['option_key'] = option_table['option_key'].apply(replace_attribute_key)

    # csv 파일로 저장
    cat_table.to_csv('category_table.csv', sep='\t', index=False)
    option_table.to_csv('option_table.csv', sep='\t', index=False)

    # cat_table 및 option_table 결과 출력
    print(cat_table)
    print(option_table)

    # 수집한 데이터를 저장할 리스트 초기화
    final_rows = []

    # 최종 데이터 사용 예시
    for _, row in option_table.iterrows():
        option_key = row['option_key']
        goods_attributes = row['option_code']
        cat_id = row['cat_id']
        high_cat = cat_table.loc[cat_id, 'high_cat']
        low_cat = cat_table.loc[cat_id, 'low_cat']
        categorycode = f'{high_cat}{low_cat}'
        for page in range(1, 11):
            data_url = f'https://display.musinsa.com/display/api/v2/categories/ITEM/goods?siteKindId=musinsa&sex=A&sortCode=pop_category&{option_key}={goods_attributes}&categoryCode={categorycode}&size=60&page={page}'
            response = requests.get(data_url)
            if response.status_code == 200:
                data = response.json()
                prod_total = data['data']['goodsList']
                for i in range(len(prod_total)):
                    final_row = {
                        'category_id': cat_id,
                        'option_id': row['option_id'],
                        'product_name': prod_total[i]['goodsName'],
                        'price': prod_total[i]['price'],
                        'product_image': prod_total[i]['imageUrl'],
                        'product_url': prod_total[i]['linkUrl'],
                        'product_type': 1,
                        'product_state': 1
                    }
                    final_rows.append(final_row)

    # 최종 데이터프레임 생성
    final_df = pd.DataFrame(final_rows)

    # 최종 데이터프레임 출력
    print(final_df)

if __name__ == "__main__":
    main()