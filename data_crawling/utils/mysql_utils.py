from sqlalchemy import create_engine
import pandas as pd

class MySQLUtils:
    def __init__(self, user, password, host, database):
        self.engine = create_engine(f'mysql+pymysql://{user}:{password}@{host}:3306/{database}')
        self.connection = self.engine.connect()

    def get_combined_data(self, type):
        """
        타입별 카테고리 정보 보기
        """
        query = f"""
        SELECT 
            c.top_category, 
            c.bottom_category, 
            o.color, 
            o.size, 
            ti.image_url AS product_url, 
            p.connect_url, 
            p.product_title, 
            p.brand, 
            p.price, 
            p.product_status
        FROM 
            productapp_product p
        JOIN 
            imageapp_totalimage_product tip ON p.id = tip.product_id
        JOIN 
            imageapp_totalimage ti ON tip.totalimage_id = ti.id
        JOIN 
            product_categoryapp_productcategory c ON p.category_id = c.id
        JOIN 
            product_optionapp_productoption o ON p.option_id = o.id
        WHERE
            p.product_type = {type};
        """
        return pd.read_sql(query, self.connection)
    

    def get_product_image_counts(self, product_type, image_type):
        """
        매칭된 값과 매칭 안되는 값들 보기
        """
        product_query = f"""
        SELECT COUNT(*)
        FROM productapp_product 
        WHERE product_type = {product_type};
        """
        image_query = f"""
        SELECT COUNT(*)
        FROM imageapp_totalimage 
        WHERE image_type = {image_type};
        """
        matched_query = f"""
        SELECT COUNT(*)
        FROM productapp_product p
        JOIN imageapp_totalimage_product tip ON p.id = tip.product_id
        JOIN imageapp_totalimage ti ON tip.totalimage_id = ti.id
        WHERE p.product_type = {product_type} AND ti.image_type = {image_type};
        """
        unmatched_product_query = f"""
        SELECT COUNT(*) 
        FROM productapp_product p
        LEFT JOIN imageapp_totalimage_product tip ON p.id = tip.product_id
        WHERE p.product_type = {product_type}
        AND tip.product_id IS NULL;
        """
        unmatched_image_query = f"""
        SELECT COUNT(*) 
        FROM imageapp_totalimage ti
        LEFT JOIN imageapp_totalimage_product tip ON ti.id = tip.totalimage_id
        WHERE ti.image_type = {image_type}
        AND tip.totalimage_id IS NULL;
        """
        product_count = self.connection.execute(product_query).scalar()
        image_count = self.connection.execute(image_query).scalar()
        matched_count = self.connection.execute(matched_query).scalar()
        unmatched_product_count = self.connection.execute(unmatched_product_query).scalar()
        unmatched_image_count = self.connection.execute(unmatched_image_query).scalar()

        return {
            "product_count": product_count,
            "image_count": image_count,
            "matched_count": matched_count,
            "unmatched_product_count": unmatched_product_count,
            "unmatched_image_count": unmatched_image_count
        }

    def save_to_csv(self, df, filename):
        df.to_csv(filename, index=False, encoding='utf-8-sig')

    def close_connection(self):
        self.connection.close()