from rest_framework import serializers

from backend.apps.accountapp.serializers import SignupSerializer
from backend.apps.articleapp.models import Article, Product, ProductCategory, ProductImage, ProductOption

# 게시판
class ArticleListSerializer(serializers.ModelSerializer):
    SignupSerializer
    class Meta:
        model = Article
        field = '__all__'

# # 옵션
# class ProductOptionSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = ProductOption
#         field = '__all__'

# # 카테고리
# class ProductCategorySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = ProductCategory
#         field = '__all__'

# # 제품
# class ProductSerializer(serializers.ModelSerializer):
#     product_category = ProductCategorySerializer()
#     product_option = ProductOptionSerializer()

#     class Meta:
#         model = Product
#         field = '__all__'
