from datetime import datetime, timezone, timedelta
import pandas as pd
import requests
import extcolors
from utils.color_extract import extract_center_50_percent, get_color_name, maintain_proportion_and_resize_by_cv2
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

def secondwear_crawling():
    load_dotenv()
    engine = create_engine(f'mysql+pymysql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:3306/{os.getenv("DB_DATABASE")}')

    korean_tz = timezone(timedelta(hours=9))

    categories = {
        '상의' : ['니트', ]
        #         '후드', '맨투맨','셔츠블라우스','긴소매티셔츠','반소매티셔츠','민소매티셔츠','카라티셔츠','베스트'],
        # '바지' : ['데님팬츠', '슬랙스','트레이닝조거팬츠','숏팬츠','코튼팬츠','레깅스'],
        # '아우터' : ['후드집업', '바람막이', '코트', '롱패딩', '숏패딩', '패딩베스트', '블루종', 
        #             '레더자켓', '무스탕', '트러커자켓', '블레이저', '가디건','뽀글이후리스','사파리자켓'],
        # '원피스' : ['미니원피스', '미디원피스', '롱원피스', '점프수트'],
        # '스커트' : ['미니스커트', '미디스커트', '롱스커트']
        }

    # 날짜 필터
    today = datetime.today()
    today_date = today.strftime('%Y%m%d')

    with open('data_crawling/secondwear_max_date.txt', 'r') as file:
        old_last_date = file.read().strip()

    count = 100

    url = f'https://www.hellomarket.com/api/search/items'

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'}

    # ------------------------------------------------ 셋팅 ------------------------------------------------

    dataframes = []
    for main,subs  in categories.items() :
        for sub in subs :
            print(f'{sub} 크롤링 중 ...')
            title,price,connect_url,product_type,status,brand,top,bottom,color,size,product_url = [[] for _ in range(11)]
            for page in range(1, 100) :
                params = {
                    "q": sub,
                    "page": page,
                    "sort": "current",
                    "limit": count
                }

                try:
                    res = requests.get(url, headers=headers, params=params)
                    res.raise_for_status()

                except requests.exceptions.HTTPError as e:
                    print(f"HTTP error occurred: {e}")
                    continue

                except requests.exceptions.RequestException as e:
                    print(f"Error occurred: {e}")
                    continue

                all_info_dict = res.json()

                product_info_list = all_info_dict.get('list', [])

                if not product_info_list:
                    print(f"{sub}의 페이지 {page}에서 데이터가 없습니다. 다음으로 카테고리로 넘어갑니다.")
                    continue

                for product_info in product_info_list :
                    p_title = product_info['title']
                    p_price = product_info['price']
                    p_connect_url = product_info['linkUrl']
                    p_type = 2
                    p_status = product_info['usedType']['name']
                    # 브랜드
                    try:
                        p_brand = product_info['brand']['korean']
                    except:
                        p_brand = '노브랜드'
                    p_top = f'{main}'
                    p_bottom = f'{sub}'
                    # 사이즈
                    try :
                        p_size = product_info['clothesSize']['name']
                    except :
                        p_size = 'FREE'
                        
                    datetimes_kst = datetime.fromtimestamp(product_info['timestamp'] / 1000, korean_tz).date()

                    # 상품이미지 url
                    try:
                        p_product_url = product_info['imageUrl']
                        image = maintain_proportion_and_resize_by_cv2(p_product_url, (416, 416))
                        cropped_center_img = extract_center_50_percent(image)
                        colors, pixel_count = extcolors.extract_from_image(cropped_center_img)
                        main_color = get_color_name(colors[0][0])
                    except:
                        main_color = "기타색상"

                    # 반영
                    title.append(p_title)
                    price.append(p_price)
                    connect_url.append(p_connect_url)
                    product_type.append(p_type)
                    status.append(p_status)
                    brand.append(p_brand)
                    top.append(p_top)
                    bottom.append(p_bottom)
                    color.append(main_color)
                    size.append(p_size)
                    product_url.append(product_info['imageUrl'])

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
                'date' : datetimes_kst,
                })  
            dataframes.append(df)

    # ------------------------------------------------ 전처리 ------------------------------------------------

    df = pd.concat(dataframes, axis = 0, ignore_index=True)
    df['connect_url'] = [f'https://www.hellomarket.com/item/{connect_url.split("/")[-1]}?viewLocation=search_result' for connect_url in df['connect_url']]


    df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')
    old_last_date = pd.to_datetime(old_last_date, format='%Y%m%d')
    today_date = pd.to_datetime(today_date, format='%Y%m%d')


    df = df[(df['date'] > old_last_date) & (df['date'] <= today_date)]
    df.loc[df['top_category'] == '바지', 'top_category'] = '하의'

    new_max_date = df['date'].max().strftime('%Y%m%d')
    with open('data_crawling/secondwear_max_date.txt', 'w') as file:
        file.write(new_max_date)

    df = df[['top_category', 'bottom_category', 'title', 'price', 'connect_url', 'product_url', 'type', 'status', 'brand', 'color', 'size', 'date']]
    df = df.drop_duplicates()
    
    df.to_csv('secondwear_data.csv', index=False, encoding='utf-8-sig')

    df['price'] = df['price'].astype(int)
    df['type'] = df['type'].astype(int)

    # ------------------------------------------------ SQL ------------------------------------------------

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

    try:
        # 데이터베이스 트랜잭션 시작

        with engine.begin() as conn:
            # product table
            for start in range(0, len(product_data), batch_size):
                batch_df = product_data[start:start+batch_size]
                batch_df.to_sql('productapp_product', conn, if_exists='append', index=False)

            # image table
            image_data = df[['product_url', 'date']].copy()
            image_data.columns = ['image_url','create_at']
            image_data['image_type'] = 2
            image_data['user_id'] = None

            for start in range(0, len(image_data), batch_size):
                batch_df = image_data[start:start+batch_size]
                batch_df.to_sql('imageapp_totalimage', conn, if_exists='append', index=False)

            # product_image table
            product_query = """
            SELECT id, connect_url 
            FROM productapp_product 
            WHERE create_at = %s AND product_type = 2
            """
            product_df = pd.read_sql(product_query, conn, params=(today_date,))
            
            image_query = """
            SELECT id, image_url 
            FROM imageapp_totalimage 
            WHERE create_at = %s AND image_type = 2
            """
            image_df = pd.read_sql(image_query, conn, params=(today_date,))
      
            product_image_df = pd.DataFrame({
                'totalimage_id': image_df['id'].to_list(),
                'product_id': product_df['id'].to_list()
            })

            product_image_df.to_sql('imageapp_totalimage_product', conn, if_exists='append', index=False)

        # 트랜잭션이 성공적으로 완료되면 메시지 출력
        print("데이터베이스 삽입 완료")
    except Exception as e:
        print(f"오류 발생: {e}. 모든 변경 사항을 롤백합니다.")
    return "세컨드웨어 크롤링 종료 "