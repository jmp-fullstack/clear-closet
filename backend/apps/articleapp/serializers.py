from rest_framework import serializers

# from apps.accountapp.serializers import CustomUserSerializer
from apps.articleapp.models import Article
from apps.imageapp.serializers import TotalImageSerializer
from apps.product_categoryapp.serializers import ProductCategorySerializer
from apps.product_optionapp.serializers import ProductOptionSerializer
from apps.productapp.models import Product
from apps.productapp.serializers import ProductSerializer


class ArticleSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)


class ArticleListProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)
    product_images = TotalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['price', 'category', 'product_images']


class ArticleListSerializer(serializers.ModelSerializer):
    product = ArticleListProductSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ["product", "article_title"]