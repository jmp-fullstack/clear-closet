from mysql_utils import MySQLUtils
import os
from dotenv import load_dotenv

load_dotenv()

db_utils = MySQLUtils(
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    database=os.getenv("DB_DATABASE")
)


try:
    df = db_utils.get_combined_data(1)
    db_utils.save_to_csv(df, 'musinsa.csv')
    print("csv 저장 성공")
except Exception as e:
    print(f"Error occurred: {e}")

db_utils.close_connection()