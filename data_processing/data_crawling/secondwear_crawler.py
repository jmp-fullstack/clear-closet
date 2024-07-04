import requests
from bs4 import BeautifulSoup
import pandas as pd


def secondwear_crawler(categories) :

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'}

    dataframes = []

    for main,subs  in categories.items() :
        for sub in subs :
            print(f'{sub} 크롤링 중 ...')
            title,price,connect_url,product_type,status,brand,top,bottom,color,size,product_url = [[] for _ in range(11)]
            for page in range(1, 9) :

                url = f'https://www.hellomarket.com/api/search/items?q={sub}&page={page}&limit=30'

                res = requests.get(url, headers=headers)
                all_info_dict = res.json()

                product_info_list = all_info_dict['list']

                for product_info in product_info_list :
                    # 제목
                    p_title = product_info['title']
                    # 상품가격
                    p_price = product_info['price']
                    # 판매처 url
                    p_connect_url = product_info['linkUrl']
                    # 상품타입
                    p_type = 0
                    # 상품상태
                    p_status = product_info['usedType']['name']
                    # 브랜드
                    try:
                        p_brand = product_info['brand']['korean']
                    except:
                        p_brand = 'NO BRAND'
                    # 상위 카테고리
                    p_top = f'{main}'
                    # 하위 카테고리
                    p_bottom = f'{sub}'
                    # 색깔
                    p_color = 'null'
                    # 사이즈
                    try :
                        p_size = product_info['clothesSize']['name']
                    except :
                        p_size = 'FREE'
                    # 상품이미지 url
                    p_product_url = product_info['imageUrl']
                    # 반영
                    title.append(p_title)
                    price.append(p_price)
                    connect_url.append(p_connect_url)
                    product_type.append(p_type)
                    status.append(p_status)
                    brand.append(p_brand)
                    top.append(p_top)
                    bottom.append(p_bottom)
                    color.append(p_color)
                    size.append(p_size)
                    product_url.append(p_product_url)
            connect_url = [f'https://www.hellomarket.com/item/{p_connect_url.split("/")[-1]}?viewLocation=search_result' for p_connect_url in connect_url]
            df = pd.DataFrame({
                'title' : title,
                'price' : price,
                'connect_url' : connect_url,
                'type' : product_type,
                'status' : status,
                'brand' : brand,
                'top_category' : top,
                'bottom_category' : bottom,
                'color' : color,
                'size' : size,
                'product_url' : product_url,
                })  

            dataframes.append(df)  


    final_df = pd.concat(dataframes, axis = 0, ignore_index=True)

    return final_df

      



           