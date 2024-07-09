from datetime import datetime
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os
import pandas as pd
import requests
import extcolors
from utils.color_extract import extract_center_50_percent, get_color_name, maintain_proportion_and_resize_by_cv2

def musinsa_crawling():
    load_dotenv()
    engine = create_engine(f'mysql+pymysql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:3306/{os.getenv("DB_DATABASE")}')

    classes_composition_list = [
        # 상의 001
        ('상의', '001', '니트', '001006'),
        ('상의', '001', '후드', '001004'),
        ('상의', '001', '맨투맨', '001005'),
        ('상의', '001', '셔츠블라우스', '001002'),
        ('상의', '001', '긴소매티셔츠', '001010'),
        ('상의', '001', '반소매티셔츠', '001001'),
        ('상의', '001', '민소매티셔츠', '001011'),
        ('상의', '001', '카라티셔츠', '001003'),
        ('상의', '001', '베스트', '002021'),

        # 바지 003
        ('바지', '003', '데님팬츠', '003002'),
        ('바지', '003', '슬랙스', '003008'),
        ('바지', '003', '트레이닝조거팬츠', '003004'),
        ('바지', '003', '숏팬츠', '003009'),
        ('바지', '003', '코튼팬츠', '003007'),
        ('바지', '003', '레깅스', '003005'),

        # 아우터 002
        ('아우터', '002', '후드집업', '002022'),
        ('아우터', '002', '바람막이', '002006'),
        ('아우터', '002', '코트', '002008'),
        ('아우터', '002', '코트', '002007'),
        ('아우터', '002', '코트', '002024'),
        ('아우터', '002', '코트', '002009'),
        ('아우터', '002', '롱패딩', '002013'),
        ('아우터', '002', '숏패딩', '002012'),
        ('아우터', '002', '패딩베스트', '002016'),
        ('아우터', '002', '블루종', '002001'),
        ('아우터', '002', '레더자켓', '002002'),
        ('아우터', '002', '무스탕', '002025'),
        ('아우터', '002', '트러커자켓', '002017'),
        ('아우터', '002', '블레이저', '002003'),
        ('아우터', '002', '가디건', '002020'),
        ('아우터', '002', '뽀글이후리스', '002023'),
        ('아우터', '002', '사파리자켓', '002014'),

        # 원피스 020
        ('원피스', '020', '미니원피스', '020'),
        ('원피스', '020', '미디원피스', '020007'),
        ('원피스', '020', '롱원피스', '020008'),

        # 스커트 022
        ('스커트', '022', '미니스커트', '022001'),
        ('스커트', '022', '미디스커트', '022002'),
        ('스커트', '022', '롱스커트', '022003')
    ]

    today = datetime.today()
    today_date = today.strftime('%Y%m%d')

    with open('data_crawling/musinsa_max_date.txt', 'r') as file:
        old_last_date = file.read().strip()

    url = "https://search.musinsa.com/api/search/v2/goods"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
    }

    pages = 1
    data = []
    for page in range(pages):
        for composition in classes_composition_list:
            params = {
                "siteKindId": "musinsa",
                "keyword": f"{composition[2]}",
                "includeSoldOut": "false",
                "includeUnisex": "true",
                "sort": "NEW",
                "originalYn": "N",
                "size": "60",
                "category1DepthCode": f"{composition[1]}",
                "category2DepthCodes": f"{composition[3]}",
                "sex": "M",
                "page": 1
            }

            res = requests.get(url, params=params, headers=headers)
            items = res.json()['data']['list']
            for item in items:
                # 색 추출
                product_url = item['imageUrl']
                image = maintain_proportion_and_resize_by_cv2(product_url, (416, 416))
                cropped_center_img = extract_center_50_percent(image)
                colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
                main_color = get_color_name(colors[0][0])
                print(main_color)

                data.append({
                    'price': item['price'],
                    'product_url': product_url,
                    'connect_url': item['linkUrl'],
                    'title': item['goodsName'],
                    'brand': item['brandName'],
                    'date': item['registDateFormat'],
                    'color': main_color
                })
    
            # DataFrame 생성
            df = pd.DataFrame(data, columns=['price', 'product_url', 'connect_url', 'title', 'brand', 'date','color'])
            df['top_category'] = [f'{composition[0]}'] * len(df)
            df['bottom_category'] = [f'{composition[2]}'] * len(df)
            df['type'] = [1] * len(df)
            df['status'] = ['새 상품'] * len(df)
            df['size'] = ['지정안함'] * len(df)

    # date 필터링
    df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')
    old_last_date = pd.to_datetime(old_last_date, format='%Y%m%d')
    today_date = pd.to_datetime(today_date, format='%Y%m%d')

    df = df[(df['date'] > old_last_date) & (df['date'] <= today_date)]
    df.loc[df['top_category'] == '바지', 'top_category'] = '하의'

    # max_date 저장
    new_max_date = df['date'].max().strftime('%Y%m%d')
    with open('data_crawling/musinsa_max_date.txt', 'w') as file:
        file.write(new_max_date)

    df = df[['top_category', 'bottom_category', 'title', 'price', 'connect_url', 'product_url', 'type', 'status', 'brand', 'color', 'size', 'date']]
    df = df.drop_duplicates()

    df.to_csv('musinsa_data.csv', index=False, encoding='utf-8-sig')

    df['price'] = df['price'].astype(int)
    df['type'] = df['type'].astype(int)

    # SQL
    category_query = """
    SELECT id AS category_id, top_category, bottom_category 
    FROM product_categoryapp_productcategory
    """

    option_query = """
    SELECT id AS option_id, color, size 
    FROM product_optionapp_productoption
    """
    category_df = pd.read_sql(category_query, engine)
    option_df = pd.read_sql(option_query, engine)

    df = df.merge(category_df, on=['top_category', 'bottom_category'], how='left')
    df = df.merge(option_df, on=['color', 'size'], how='left')

    product_data = df[['title', 'price', 'brand', 'connect_url', 'type', 'status', 'category_id', 'option_id', 'date']]
    product_data.columns = ['product_title', 'price', 'brand', 'connect_url', 'product_type', 'product_status', 'category_id', 'option_id', 'create_at']

    batch_size = 5000
    # product table
    for start in range(0, len(product_data), batch_size):
        batch_df = product_data[start:start+batch_size]
        batch_df.to_sql('productapp_product', engine, if_exists='append', index=False)

    # image table
    image_data = df[['product_url', 'date']].copy()
    image_data.columns = ['image_url','create_at']
    image_data['image_type'] = 1
    image_data['user_id'] = None

    for start in range(0, len(image_data), batch_size):
        batch_df = image_data[start:start+batch_size]
        batch_df.to_sql('imageapp_totalimage', engine, if_exists='append', index=False)

    # product_image table
    today_date = today.strftime('%Y-%m-%d')

    with engine.connect() as conn:
        product_query = """
        SELECT id, connect_url 
        FROM productapp_product 
        WHERE create_at = %s AND product_type = 1
        """
        product_df = pd.read_sql(product_query, conn, params=(today_date,))
        
        image_query = """
        SELECT id, image_url 
        FROM imageapp_totalimage 
        WHERE create_at = %s AND image_type = 1
        """
        image_df = pd.read_sql(image_query, conn, params=(today_date,))
        
    product_image_df = pd.DataFrame({
        'totalimage_id': image_df['id'].to_list(),
        'product_id': product_df['id'].to_list()
    })

    with engine.connect() as conn:
        product_image_df.to_sql('imageapp_totalimage_product', conn, if_exists='append', index=False)

    return "무신사 데이터베이스 삽입 완료"