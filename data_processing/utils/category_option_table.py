from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import pandas as pd
import os

load_dotenv()

engine = create_engine(f'mysql+pymysql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:3306/{os.getenv("DB_DATABASE")}')

categories = {
    '상의' : ['니트', '후드', '맨투맨','셔츠블라우스','긴소매티셔츠','반소매티셔츠','민소매티셔츠','카라티셔츠','베스트'],
    '바지' : ['데님팬츠', '슬랙스','트레이닝조거팬츠','숏팬츠','코튼팬츠','레깅스'],
    '아우터' : ['후드집업', '바람막이', '코트', '롱패딩', '숏패딩', '패딩베스트', '블루종', 
                '레더자켓', '무스탕', '트러커자켓', '블레이저', '가디건','뽀글이후리스','사파리자켓'],
    '원피스' : ['미니원피스', '미디원피스', '롱원피스', '점프수트'],
    '스커트' : ['미니스커트', '미디스커트', '롱스커트']
}

colors = ["블랙", "화이트", "네이비", "아이보리", "라이트그레이", "그레이", "다크그레이", "스카이블루", "블루", "베이지", "그린", "라이트핑크", "브라운", "카키", "핑크", "민트", "기타색상", "샌드", "레드", "옐로우", "라이트옐로우", "오렌지", "라벤더", "다크그린", "퍼플", "라이트그린", "페일핑크", "올리브그린", "버건디", "데님", "카멜", "딥레드", "연청", "카키베이지", "흑청", "실버", "중청", "진청", "로즈골드", "골드", "지정안함"]
sizes = ["XS", "S", "M", "L", "XL", "2XL이상", "FREE", "지정안함"]

# -------------------------------------

category = []
for key in categories:
    for value in categories[key]:
        category.append((key, value))
category_df = pd.DataFrame(category, columns=["top_category","bottom_category"])

category_table = 'product_categoryapp_productcategory'
category_df.to_sql(category_table, engine, if_exists='append', index=False)



option = []
for size in sizes:
    for color in colors:
        option.append((size, color))
option_df = pd.DataFrame(option, columns=['size', 'color'])

option_table_name = 'product_optionapp_productoption'
option_df.to_sql(option_table_name, engine, if_exists='append', index=False)