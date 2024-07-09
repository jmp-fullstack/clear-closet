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
    '원피스' : ['미니원피스', '미디원피스', '롱원피스'],
    '스커트' : ['미니스커트', '미디스커트', '롱스커트']
}

colors = ['어두운 빨강', '빨강', '밝은 빨강', '어두운 초록', '초록', '밝은 초록', '어두운 파랑', '파랑', '밝은 파랑', '어두운 노랑', '노랑', '밝은 노랑', '어두운 자홍', '자홍', '밝은 자홍', '어두운 청록', '청록', '밝은 청록', '어두운 주황', '주황', '밝은 주황', '어두운 보라', '보라', '밝은 보라', '어두운 분홍', '분홍', '밝은 분홍', '어두운 라임', '라임', '밝은 라임', '어두운 갈색', '갈색', '밝은 갈색', '어두운 회색', '회색', '밝은 회색', '검정', '흰색','기타색상']
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