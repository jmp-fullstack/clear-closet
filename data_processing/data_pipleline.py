from data_crawling.secondwear_crawler import secondwear_crawler
from data_crawling.musinsa_crawler import musinsa_crawler
from data_crawling.ably_crawler import ably_crawler
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

# --------- 셋팅 ---------
load_dotenv()
engine = create_engine(f'mysql+pymysql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:3306/{os.getenv("DB_DATABASE")}')

categories = {
    '상의' : ['니트', '후드', '맨투맨','셔츠블라우스','긴소매티셔츠','반소매티셔츠','민소매티셔츠','카라티셔츠','베스트'],
    '바지' : ['데님팬츠', '슬랙스','트레이닝조거팬츠','숏팬츠','코튼팬츠','레깅스', '와이드팬츠'],
    '아우터' : ['후드집업', '바람막이', '코트', '롱패딩', '숏패딩', '패딩베스트', '블루종', 
                '레더자켓', '무스탕', '트러커자켓', '블레이저', '가디건','뽀글이후리스','사파리자켓'],
    '원피스' : ['미니원피스', '미디원피스', '투피스', '롱원피스', '점프수트'],
    '스커트' : ['미니스커트', '미디스커트', '롱스커트']
}

ably_base_urls = {

    '상의' : {
        '니트': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%8B%88%ED%8A%B8&search_type=DIRECT',
        '후드': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%ED%9B%84%EB%93%9C&search_type=DIRECT',
        '맨투맨': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%A7%A8%ED%88%AC%EB%A7%A8&search_type=DIRECT',
        '셔츠블라우스': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%85%94%EC%B8%A0%20%EB%B8%94%EB%9D%BC%EC%9A%B0%EC%8A%A4&search_type=DIRECT',
        '긴소매티셔츠': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EA%B8%B4%EC%86%8C%EB%A7%A4%ED%8B%B0%EC%85%94%EC%B8%A0&search_type=DIRECT',
        '반소매티셔츠': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%B0%98%EC%86%8C%EB%A7%A4%20%ED%8B%B0%EC%85%94%EC%B8%A0&search_type=DIRECT',
        '민소매티셔츠': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%AF%BC%EC%86%8C%EB%A7%A4%20%ED%8B%B0%EC%85%94%EC%B8%A0&search_type=DIRECT',
        '카라티셔츠': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%B9%B4%EB%9D%BC%20%ED%8B%B0%EC%85%94%EC%B8%A0&search_type=DIRECT',
        '베스트': 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%B2%A0%EC%8A%A4%ED%8A%B8&search_type=DIRECT'
    }, # 9개

    '바지' : {
        '데님팬츠' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%8D%B0%EB%8B%98%ED%8C%AC%EC%B8%A0&search_type=DIRECT',
        '슬랙스' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%8A%AC%EB%9E%99%EC%8A%A4&search_type=DIRECT',
        '트레이닝조거팬츠' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%ED%8A%B8%EB%A0%88%EC%9D%B4%EB%8B%9D%20%EC%A1%B0%EA%B1%B0%ED%8C%AC%EC%B8%A0&search_type=DIRECT',
        '숏팬츠' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%88%8F%ED%8C%AC%EC%B8%A0&search_type=DIRECT',
        '코튼팬츠' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%BD%94%ED%8A%BC%20%ED%8C%AC%EC%B8%A0&search_type=DIRECT',
        '레깅스' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%A0%88%EA%B9%85%EC%8A%A4&search_type=DIRECT',
        '와이드팬츠' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%99%80%EC%9D%B4%EB%93%9C%20%ED%8C%AC%EC%B8%A0&search_type=DIRECT'
    }, # 7개

    '아우터' : {
        '후드집업' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%ED%9B%84%EB%93%9C%20%EC%A7%91%EC%97%85&search_type=DIRECT',
        '바람막이' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%B0%94%EB%9E%8C%EB%A7%89%EC%9D%B4&search_type=DIRECT',
        '코트' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%BD%94%ED%8A%B8&search_type=DIRECT',
        '롱패딩' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%A1%B1%ED%8C%A8%EB%94%A9&search_type=DIRECT',
        '숏패딩' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%88%8F%ED%8C%A8%EB%94%A9&search_type=DIRECT',
        '패딩베스트' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%ED%8C%A8%EB%94%A9%20%EB%B2%A0%EC%8A%A4%ED%8A%B8&search_type=DIRECT',
        '블루종' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%B8%94%EB%A3%A8%EC%A2%85&search_type=DIRECT',
        '레더자켓' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%9D%BC%EC%9D%B4%EB%8D%94%EC%9E%90%EC%BC%93&search_type=DIRECT',
        '무스탕' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%AC%B4%EC%8A%A4%ED%83%95&search_type=DIRECT',
        '트러커자켓' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%ED%8A%B8%EB%9F%AC%EC%BB%A4%20%EC%9E%90%EC%BC%93&search_type=DIRECT',
        '블레이저' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%B8%94%EB%A0%88%EC%9D%B4%EC%A0%80&search_type=DIRECT',
        '가디건' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EA%B0%80%EB%94%94%EA%B1%B4&search_type=DIRECT',
        '뽀글이후리스' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%BD%80%EA%B8%80%EC%9D%B4%20%ED%9B%84%EB%A6%AC%EC%8A%A4&search_type=DIRECT',
        '사파리자켓' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%82%AC%ED%8C%8C%EB%A6%AC%20%EC%9E%90%EC%BC%93&search_type=DIRECT'
    }, # 14

    '원피스' : {
        '미니원피스' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%AF%B8%EB%8B%88%EC%9B%90%ED%94%BC%EC%8A%A4&search_type=DIRECT',
        '미디원피스' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%AF%B8%EB%94%94%EC%9B%90%ED%94%BC%EC%8A%A4&search_type=DIRECT',
        '투피스' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%ED%88%AC%ED%94%BC%EC%8A%A4%20%EC%84%B8%ED%8A%B8&search_type=AUTO_COMPLETE_SEARCH_KEYWORD',
        '롱원피스' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%A1%B1%20%EC%9B%90%ED%94%BC%EC%8A%A4&search_type=DIRECT',
        '점프수트' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EC%A0%90%ED%94%84%EC%88%98%ED%8A%B8&search_type=DIRECT'
    }, # 5

    '스커트' : {
        '미니스커트' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%AF%B8%EB%8B%88%EC%8A%A4%EC%BB%A4%ED%8A%B8&search_type=DIRECT',
        '미디스커트' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%AF%B8%EB%94%94%EC%8A%A4%EC%BB%A4%ED%8A%B8&search_type=DIRECT',
        '롱스커트' : 'https://api.a-bly.com/api/v2/screens/SEARCH_RESULT/?query=%EB%A1%B1%20%EC%8A%A4%EC%BB%A4%ED%8A%B8&search_type=DIRECT'
    } # 3

}

# --------- 수집 ---------
# 무신사
musinsa_df = musinsa_crawler(categories)
musinsa_df['size'] = 'NaN'

# 에이블리
ably_df = ably_crawler(ably_base_urls)

# 세컨드웨어
secondwear_df = secondwear_crawler(categories)
secondwear_df['connect_url'] = [f'https://www.hellomarket.com/item/{connect_url.split("/")[-1]}?viewLocation=search_result' for connect_url in secondwear_df['connect_url']]



# --------- 전처리 --------- 
columns = sorted(musinsa_df.columns)

musinsa_df = musinsa_df[columns]
ably_df = ably_df[columns]
secondwear_df = secondwear_df[columns]

all_df = pd.concat([musinsa_df, ably_df, secondwear_df], ignore_index=True)
all_df['price'] = all_df['price'].astype(int)
all_df['type'] = all_df['type'].astype(int)

all_df = all_df[['top_category','bottom_category','title','price','connect_url','product_url','type','status','brand','color','size']]
df = all_df.drop_duplicates()
df = df.fillna({'color': '지정안함', 'size': '지정안함'})


# ---------- SQL

# relation
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

product_data = df[['title', 'price', 'brand', 'connect_url', 'type', 'status', 'category_id', 'option_id']]
product_data.columns = ['product_title', 'price', 'brand', 'connect_url', 'product_type', 'product_status', 'category_id', 'option_id']


batch_size = 5000
# product table
for start in range(0, len(product_data), batch_size):
    batch_df = product_data[start:start+batch_size]
    batch_df.to_sql('productapp_product', engine, if_exists='append', index=False)


# image table
image_data = df[['product_url']].copy()
image_data.columns = ['image_url']
image_data['user_id'] = None

for start in range(0, len(image_data), batch_size):
    batch_df = image_data[start:start+batch_size]
    batch_df.to_sql('imageapp_totalimage', engine, if_exists='append', index=False)


# product_image table
with engine.connect() as conn:
    product_df = pd.read_sql("SELECT id, connect_url FROM productapp_product", conn)
    image_df = pd.read_sql("SELECT id, image_url FROM imageapp_totalimage", conn)

product_image_df = pd.DataFrame({
    'totalimage_id': image_df['id'].to_list(),
    'product_id': product_df['id'].to_list()
})

with engine.connect() as conn:
    product_image_df.to_sql('imageapp_totalimage_product', conn, if_exists='append', index=False)