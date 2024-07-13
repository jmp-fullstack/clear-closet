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
    connection = engine.connect()

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

        # 바지 003
        ('바지', '003', '데님팬츠', '003002'),
        ('바지', '003', '슬랙스', '003008'),
        ('바지', '003', '트레이닝조거팬츠', '003004'),
        ('바지', '003', '숏팬츠', '003009'),
        ('바지', '003', '코튼팬츠', '003007'),
        ('바지', '003', '레깅스', '003005'),

        # 아우터 002
        ('아우터', '002', '베스트', '002021'),
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
        ('원피스', '020', '미니원피스', '020006'),
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

    pages = 3
    top_category, bottom_category, price, pro_url, connect_url, title, brand, date, color, type, status, size = [[] for _ in range(12)]
    
    for page in range(1, pages):
        for composition in classes_composition_list:
            params = {
                "siteKindId": "musinsa",
                "keyword": composition[2],
                "includeSoldOut": "false",
                "includeUnisex": "true",
                "sort": "NEW",
                "originalYn": "N",
                "size": "60",
                "category1DepthCode": composition[1],
                "category2DepthCodes": composition[3],
                "sex": "A",
                "page": page
            }

            try:
                res = requests.get(url, params=params, headers=headers)
                res.raise_for_status()
            except requests.exceptions.HTTPError as e:
                print(f"HTTP error occurred: {e}")
                continue
            except requests.exceptions.RequestException as e:
                print(f"Error occurred: {e}")
                continue

            items = res.json().get('data', {}).get('list', [])

            if not items:
                print(f"{composition[2]}의 페이지 {page}에서 데이터가 없습니다. 다음 페이지로 넘어갑니다.")
                continue


            for item in items:
                product_url = item['imageUrl']
                image = maintain_proportion_and_resize_by_cv2(product_url, (416, 416))
                cropped_center_img = extract_center_50_percent(image)
                colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
                main_color = get_color_name(colors[0][0])

                top_category.append(composition[0])
                bottom_category.append(composition[2])
                price.append(item['price'])
                pro_url.append(item['imageUrl'])
                connect_url.append(item['linkUrl'])
                title.append(item['goodsName'])
                brand.append(item['brandName'])
                date.append(item['registDateFormat'])
                color.append(main_color)
                type.append(1)
                status.append('새 상품')
                size.append('지정안함')
    data = {
    'top_category' :top_category ,
    'bottom_category' :bottom_category,
    'price':price,
    'product_url':pro_url,
    'connect_url':connect_url,
    'title':title,
    'brand':brand,
    'date':date,
    'color':color,
    'type':type,
    'status':status,
    'size' :size
    }

    try:
        # 데이터 준비
        df = pd.DataFrame(data)
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

        # 데이터베이스 트랜잭션 시작
        with engine.begin() as conn:
            # product table
            for start in range(0, len(product_data), batch_size):
                batch_df = product_data[start:start+batch_size]
                batch_df.to_sql('productapp_product', conn, if_exists='append', index=False)

            # image table
            image_data = df[['product_url', 'date']].copy()
            image_data.columns = ['image_url', 'create_at']
            image_data['image_type'] = 1
            image_data['user_id'] = None

            for start in range(0, len(image_data), batch_size):
                batch_df = image_data[start:start+batch_size]
                batch_df.to_sql('imageapp_totalimage', conn, if_exists='append', index=False)

            # product_image table
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

            if len(product_df) == len(image_df):
                product_image_df = pd.DataFrame({
                    'totalimage_id': image_df['id'].to_list(),
                    'product_id': product_df['id'].to_list()
                })
                product_image_df.to_sql('imageapp_totalimage_product', conn, if_exists='append', index=False)
            else:
                print("Product 데이터와 Image 데이터의 길이가 일치하지 않습니다.")
                raise ValueError("Product 데이터와 Image 데이터의 길이가 일치하지 않습니다.")
        print("데이터베이스 삽입 완료")

        # 매칭되지 않은 데이터 처리
        try:
            # 매칭되지 않은 productapp_product 가져오기
            unmatched_products = pd.read_sql("""
                SELECT p.id 
                FROM productapp_product p
                LEFT JOIN imageapp_totalimage_product tip ON p.id = tip.product_id
                WHERE p.product_type = 1
                AND tip.product_id IS NULL;
                """, connection)

            print(f"Unmatched product IDs: {len(unmatched_products)}")

            # 매칭되지 않은 imageapp_totalimage 가져오기
            unmatched_images = pd.read_sql("""
                SELECT ti.id 
                FROM imageapp_totalimage ti
                LEFT JOIN imageapp_totalimage_product tip ON ti.id = tip.totalimage_id
                WHERE ti.image_type = 1
                AND tip.totalimage_id IS NULL;
                """, connection)

            print(f"Unmatched image IDs: {len(unmatched_images)}")

            # 매칭되지 않은 데이터를 매핑하기
            unmatched_product_ids = unmatched_products['id'].tolist()
            unmatched_image_ids = unmatched_images['id'].tolist()

            mapped_df = pd.DataFrame({
                'product_id': unmatched_product_ids,
                'totalimage_id': unmatched_image_ids
            })

            print("Mapped DataFrame sample:")
            print(mapped_df.head())

            with engine.begin() as conn:
                mapped_df.to_sql('imageapp_totalimage_product', conn, if_exists='append', index=False)

            print("Data mapping and insertion completed successfully.")

        except Exception as e:
            print(f"Error occurred: {e}")

    finally:
        # 연결 종료
        connection.close()