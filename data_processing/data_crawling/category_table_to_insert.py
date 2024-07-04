import psycopg2

# PostgreSQL 데이터베이스에 연결
conn = psycopg2.connect(
    dbname="your_dbname",
    user="your_user",
    password="your_password",
    host="your_host",
    port="your_port"
)

# 커서 생성
cur = conn.cursor()

# 카테고리 딕셔너리 정의
categories = {
    '상의' : ['니트', '후드', '맨투맨','셔츠블라우스','긴소매티셔츠','반소매티셔츠','민소매티셔츠','카라티셔츠','베스트'],
    '바지' : ['데님팬츠', '슬랙스','트레이닝조거팬츠','숏팬츠','코튼팬츠','레깅스', '와이드팬츠'],
    '아우터' : ['후드집업', '바람막이', '코트', '롱패딩', '숏패딩', '패딩베스트', '블루종', 
                '레더자켓', '무스탕', '트러커자켓', '블레이저', '가디건','뽀글이후리스','사파리자켓'],
    '원피스' : ['미니원피스', '미디원피스', '투피스', '롱원피스', '점프수트'],
    '스커트' : ['미니스커트', '미디스커트', '롱스커트'],
}

# 데이터 삽입 쿼리
insert_query = """
INSERT INTO product_category (top_category, bottom_category) 
VALUES (%s, %s)
"""

# 데이터 삽입
for top_category, bottom_categories in categories.items():
    for bottom_category in bottom_categories:
        # 상위, 하위 카테고리를 매칭시킨 후 쿼리문 실행
        cur.execute(insert_query, (top_category, bottom_category))

# 변경사항 커밋(반영)
conn.commit()

# 커서와 연결 닫기
cur.close()
conn.close()
