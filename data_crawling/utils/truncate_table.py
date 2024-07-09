from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import pandas as pd
import os

load_dotenv()

engine = create_engine(f'mysql+pymysql://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:3306/{os.getenv("DB_DATABASE")}')

# 삭제예정 [테스트용]

with engine.connect() as conn:
    conn.execute(text("SET FOREIGN_KEY_CHECKS = 0;"))
    conn.execute(text("TRUNCATE TABLE imageapp_totalimage_product;"))
    conn.execute(text("TRUNCATE TABLE imageapp_totalimage;"))
    conn.execute(text("TRUNCATE TABLE productapp_product;"))
    conn.execute(text("TRUNCATE TABLE product_categoryapp_productcategory;"))
    conn.execute(text("TRUNCATE TABLE product_optionapp_productoption;"))
    conn.execute(text("TRUNCATE TABLE accountapp_customuser;"))
    conn.execute(text("TRUNCATE TABLE articleapp_article;"))
    conn.execute(text("TRUNCATE TABLE articleapp_article;"))
    conn.execute(text("TRUNCATE TABLE articleapp_article;"))
    conn.execute(text("SET FOREIGN_KEY_CHECKS = 1;"))
