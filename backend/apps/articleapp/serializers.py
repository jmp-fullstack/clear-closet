from rest_framework import serializers

# from apps.accountapp.serializers import CustomUserSerializer
from apps.articleapp.models import Article
from apps.product_categoryapp.models import ProductCategory
from apps.product_optionapp.models import ProductOption
from apps.productapp.models import Product
from apps.productapp.serializers import ProductArticleSerializer, ProductMatchSerializer

class ArticleSaveSerializer(serializers.ModelSerializer):
    product = ProductMatchSerializer()

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ['id','user']

class ArticleListSerializer(serializers.ModelSerializer):
    product = ProductArticleSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ["id", "title","product"]


class ArticleDetailSerializer(serializers.ModelSerializer):
    product = ProductArticleSerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ['user','update_at','create_at','id']