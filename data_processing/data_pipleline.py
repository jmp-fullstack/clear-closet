from secondwear_crawler import secondwear_crawler
from musinsa_crawler import musinsa_crawler
from ably_crawler import return_json_data, extract_goods_info, collect_ably_data, make_ably_dataframe, main_ably,ably_crawler
import pymysql
import traceback
import pandas as pd
from typing import Iterable
from typing import Union


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


class MariaDB:
    """
    MariaDB
    """

    def __init__(self, db_config:dict, cursor_type="tuple") -> None:
        """
        생성자 메서드
        인스턴스 생성 시 db_config를 전달받아 DB에 연결합니다.
        
        **db_config**
            host=database host (localhost)
            port=port (3306)
            user=username (root)
            password=password (1q2w3e)
            database=database name (testdb)
            charset=charcter encoding (utf8mb4)
        """

        db_config['port'] = int(db_config.get('port', '3306'))
        self.DB = pymysql.connect(**db_config)

        if cursor_type == 'dict':
            self.cursor_type = pymysql.cursors.DictCursor
        else:
            self.cursor_type = None
            
        return
    
    def __del__(self):
        """
        인스턴스 소멸 시 DB 연결 해제
        """
        self.DB.close()

    def select(self, column_qry:str, table:str, limit=None, offset=None, order_by=None, where_condition=[]) -> tuple:
        """
        Select

        ex) 
        column_qry = "*" : 모든열
        column_qry = "id, name, email" : 열이름
        table = "esg_project" : 테이블이름

        """

        sql_qr = "SELECT {0} FROM {1}".format(column_qry, table)
        if order_by:
            sql_qr += ' ORDER BY {}'.format(order_by)
        if limit:
            sql_qr += ' LIMIT {}'.format(limit)
        if offset:
            sql_qr += ' OFFSET {}'.format(offset)
        if where_condition:
            for i, (col, eq, val) in enumerate(where_condition):
                is_equal = '=' if eq else '!='
                is_multiple = ' AND' if i > 1 else ' WHERE'
                sql_qr += f'{is_multiple} {col}{is_equal}{val}'


        with self.DB.cursor() as cur:
            cur.execute(sql_qr)
            return cur.fetchall()
        

    def insert(self, table:str, columns: str, value: tuple) -> Union[int, bool]:
        """
        Insert Data
        
        example)
        table = "Students"
        columns = "name, email, phone"
        values = ('이름', '이메일', '번호')
        """

        sql_qr = f"INSERT INTO {table}({columns}) " \
                  "VALUES (" +','.join(["%s"]*len(value)) +")"
        # args = values
        
        try:
            with self.DB.cursor() as cur:
                cur.execute(sql_qr, value)
                self.DB.commit()
            return cur.lastrowid
        except:
            traceback.print_exc()
            self.DB.rollback()
            return False
    
    # values는 list 형식으로 넣었음, args로 함
    def insert_many(self, table: str, columns: str, values: list) -> bool:
        """
        Insert Many Datas
        
        example)
        table = "테이블이름"
        columns = "name, email, phone" 열이름들
        values = [
            ('hong gildong', 'hgd123@gmail.com', '01012345678'),
            ...
        ] 각 밸류 값들
        """
        num_columns = len(columns.split(','))
        sql = f"INSERT INTO {table} ({columns}) VALUES (" + ','.join(["%s"] * num_columns) + ");"
        try:
            with self.DB.cursor() as cur:
                cur.executemany(sql, values)
                self.DB.commit()
            return True
        except Exception as e:
            print(f"An error occurred: {e}")
            traceback.print_exc()
            self.DB.rollback()
            return False


    def update(self, table:str, set_columns:list[str], set_values:list[str], where_column:str, where_value) -> bool:
        """
        Update
        
        example)
        table = "Students"
        set_column = ["name"]
        set_value = ["jason"]
        where_column = "id"
        where_value = "1"
        """

        set_statement = ', '.join('{}="{}"'.format(sc, sv) for sc, sv in zip(set_columns, set_values))
        sql = "UPDATE {0} " \
            "SET {1} " \
            "WHERE {2}={3};".format(table, set_statement, where_column, where_value)
        try:
            with self.DB.cursor() as cur:
                cur.execute(sql)
                self.DB.commit()
            return True
        except:
            traceback.print_exc()
            self.DB.rollback()
            return False
        

    def truncate(self, table:str, forcing=True) -> bool:
        """
        truncate table
        """
        try:
            with self.DB.cursor() as cursor:
                cursor.execute(f'SET FOREIGN_KEY_CHECKS = {int(forcing)}; TRUNCATE TABLE {table};')
                self.DB.commit()
                return True
        except:
            return False
        


# 무신사
musinsa_df = musinsa_crawler(categories)
musinsa_df['size'] = 'NaN'


# 에이블리
ably_df = ably_crawler(ably_base_urls)


# 세컨드웨어
secondwear_df = secondwear_crawler(categories)


secondwear_df['connect_url'] = [f'https://www.hellomarket.com/item/{connect_url.split("/")[-1]}?viewLocation=search_result' for connect_url in secondwear_df['connect_url']]

# 통합과정

# 칼럼 이름 정렬
columns = sorted(musinsa_df.columns)

# 각 데이터프레임의 칼럼 이름 정렬
musinsa_df = musinsa_df[columns]
ably_df = ably_df[columns]
secondwear_df = secondwear_df[columns]

# 데이터프레임 합치기
all_df = pd.concat([musinsa_df, ably_df, secondwear_df], ignore_index=True)
all_df['price'] = all_df['price'].astype(int)
all_df['type'] = all_df['type'].astype(int)

# 열 순서 정렬 및 결과 확인
all_df = all_df[['top_category','bottom_category','title','price','connect_url','product_url','type','status','brand','color','size']]


df_shuffled = all_df.sample(frac=1).reset_index(drop=True)
df_sample = df_shuffled[:100]




db_config = {
    'host' : 'localhost',
    'port' : '3306',
    'user' : 'closet',
    'password' : 'Y7&hK!2zV9$pL3#x',
    'database' : 'db_closet',
    'charset' : 'utf8mb4',
}


conn = MariaDB(db_config)

# # product_category 테이블은 한번만 insert -> 주키 생성
# table = 'product_category'
# columns = 'top_category, bottom_category'
# values = [category_composition for category_composition in set(zip(all_df['top_category'], all_df['bottom_category']))]
# success = conn.insert_many(table, columns, values)
# print("Insert successful:", success)


# product_option 테이블을 먼저 넣기 -> 주키 생성
table = 'product_option'
columns = 'color, size'
values = [option_composition for option_composition in set(zip(df_sample['color'], df_sample['size']))]
success = conn.insert_many(table, columns, values)
print("Insert successful:", success)



option_list = []
for (color, size) in zip(df_sample['color'], df_sample['size']) :
    cur = conn.DB.cursor()
    cur.execute("SELECT option_id FROM OPTION WHERE color=%s AND size=%s", (color, size))
    option_id = cur.fetchone()[0]
    option_list.append(option_list)

category_list = []
for (top_category, bottom_category) in zip(df_sample['top_category'], df_sample['bottom_category']) :
    cur = conn.DB.cursor()
    cur.execute("SELECT category_id FROM CATEGORY WHERE parent_category=%s AND child_category=%s", (top_category, bottom_category))
    category_id = cur.fetchone()[0]
    category_list.append(category_id)

table = 'product'
columns = 'category_id, option_id, title, price, connect_url, type, status, brand'
values = [product_composition for product_composition in zip(category_list, option_list, df_sample['title'], df_sample['price'],df_sample['connect_url'], df_sample['type'],df_sample['status'], df_sample['brand'])]
success = conn.insert_many(table, columns, values)
print("Insert successful:", success)


# 이미지 테이블 -> product_url 
table = 'product_image'
columns = 'user_id, product_url'
values = [image_info for image_info in zip(['none']*len(df_sample),list(df_sample['product_url']))]
success = conn.insert_many(table, columns, values)
print("Insert successful:", success)


# 데이터베이스 반영 및 연결 종료
cur.close()
conn.DB.commit()
del conn

  







