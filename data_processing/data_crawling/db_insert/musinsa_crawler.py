import pandas as pd
import requests


def musinsa_crawler(categories) :

    url = 'https://search.musinsa.com/api/search/v2/goods'

    headers = {
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept':'application/json'
    }

    dataframes = []
    #
    for high, subs in categories.items():
        for sub in subs:
            data = []
            for page in range(1,6) :
                keyword = sub
                params = {
                    "siteKindId": "musinsa",
                    "keyword": keyword,
                    "includeSoldOut": "false", # 다팔린것도 포함 할꺼냐?
                    "includeUnisex": "true", # 남/여공용 포함 여부
                    "sort": "POPULAR", # 정렬순 => 인기있는
                    "originalYn": "N",
                    "size": 60,
                    "sex": "A",
                    "page": page
                }
                res = requests.get(url, headers=headers, params=params).json()
                items = res['data']['list']
                for item in items:
                    data.append({
                        'price': item['price'],
                        'product_url': item['imageUrl'],
                        'connect_url': item['linkUrl'],
                        'title': item['goodsName'],
                        # 'gender': item['displaySexCodeList'],
                        'brand' : item['brandName'],
                    })
                
                df = pd.DataFrame(data, columns=['price', 'product_url', 'connect_url', 'title', 'brand'])
                df['top_category'] = [f'{high}'] * len(df)
                df['bottom_category'] = [f'{sub}'] * len(df)
                df['type'] = [1] * len(df)
                df['status'] = ['새 상품'] * len(df)
                df['color'] = ['NaN'] * len(df)

                dataframes.append(df)



    

    final_df = pd.concat(dataframes, axis = 0, ignore_index=True)

    return final_df

       