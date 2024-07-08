import requests
from bs4 import BeautifulSoup 
import pandas as pd
import os


def return_json_data(url) :

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'X-Anonymous-Token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbm9ueW1vdXNfaWQiOiIyMzkyNzcyODgiLCJpYXQiOjE3MTgyMzkwMzd9.AXFzzsBNgrqEXyT-R_x7L-20MLdNUtMJb_W5A22hXWk'
            }

    res = requests.get(url, headers = headers)

    res.status_code

    return res.json(), res.status_code


def extract_goods_info(ably, status_code) :
    search_keyword = ably['logging']['analytics']['SEARCH_KEYWORD']
      
    filtered_components = [component['entity'] for component in ably['components'] if component['component_id'] == 41]
    
    good_name, market_name, image_url, category, good_num, price, is_new, review_count, likes_count, size, keyword, st_code = [[] for _ in range(12)]


    for entity in filtered_components :
        goods_data = entity['item_list']
        for good_data in goods_data :
            
            good_name.append(good_data['item']['name'])
            market_name.append(good_data['item']['market_name'])
            image_url.append(good_data['item']['image'])
            category.append(good_data['item']['category_name'])
            
            good_num.append( 'https://m.a-bly.com/goods/' + good_data['logging']['analytics']['GOODS_SNO'])
            price.append(good_data['logging']['analytics']['SALES_PRICE'])
            is_new.append(good_data['logging']['analytics']['IS_NEW'])
            review_count.append(good_data['logging']['analytics']['REVIEW_COUNT'])
            likes_count.append(good_data['logging']['analytics']['LIKES_COUNT'])

            size.append('FREE' if good_data['render']['size'] == 'MEDIUM' else good_data['render']['size'])

            keyword.append(search_keyword)

            st_code.append(status_code)
    
    if ably.get('next_token') :
        next_token = ably.get('next_token')
        return [good_name, market_name, image_url, category, good_num, price, is_new, review_count, likes_count, size, keyword, st_code, next_token]
    else :
        return [good_name, market_name, image_url, category, good_num, price, is_new, review_count, likes_count, size, keyword, st_code]
    

def collect_ably_data(base_url, num_requests) :

    base_url =  base_url
    ably, status_code = return_json_data(base_url)
    data = extract_goods_info(ably, status_code)

    next_token = data[-1]

    total_good_name, total_market_name, total_image_url, total_category, total_good_num ,total_price, total_is_new, total_review_count, total_likes_count, total_size, total_keyword, total_st_code = [[] for _ in range(12)]

    num_requests = 5
    count = 0
    while next_token and count <= num_requests:
        next_url = f'{base_url}&nextToken={next_token}'
        ably, status_code = return_json_data(next_url)
        data = extract_goods_info(ably, status_code)
        
        total_good_name.extend(data[0])
        total_market_name.extend(data[1])
        total_image_url.extend(data[2])
        total_category.extend(data[3])
        total_good_num.extend(data[4])
        total_price.extend(data[5])
        total_is_new.extend(data[6])
        total_review_count.extend(data[7])
        total_likes_count.extend(data[8])
        total_size.extend(data[9])
        total_keyword.extend(data[10])
        total_st_code.extend(data[11])
        
        count += 1

        if len(data) == 12 :
            break
        
        elif len(data) == 13 :
            next_token = data[-1]
    
    print(f'{base_url}에서 총 {count}번 크롤링 했습니다.')
    print(f'{list(set(total_keyword))[0]}을 검색하여 총 {len(total_good_name)}개의 제품을 크롤링 했습니다.')
        
    return total_good_name, total_market_name, total_image_url, total_category, total_good_num, total_price, total_is_new, total_review_count, total_likes_count, total_size, total_keyword, total_st_code


def make_ably_dataframe(datas) :
    data_composition = {
        'title' : datas[0], 
        'brand' : datas[1],
        'product_url' : datas[2],
        'connect_url' : datas[4],
        'price' : datas[5],
        'size' : datas[9],
       
        
    }

    return pd.DataFrame(data_composition)


def main_ably(base_url, num_requests) :
    datas = collect_ably_data(base_url, num_requests)
    return make_ably_dataframe(datas)



def ably_crawler(ably_base_urls) :

    dataframes = []

    for major_key, major_value in  ably_base_urls.items():
        for sub_key, sub_url in major_value.items():
            df = main_ably(sub_url, 10)
            df['top_category'] = [f'{major_key}'] * len(df)
            df['bottom_category'] = [f'{sub_key}'] * len(df)
            df['type'] = [1] * len(df)
            df['status'] = ['새 상품'] * len(df)
            df['color'] = ['지정안함'] * len(df)
            dataframes.append(df)

    # 리스트에 있는 모든 데이터프레임을 이어 붙이기
    final_df = pd.concat(dataframes, axis = 0, ignore_index=True)

    return final_df

    
#