from rest_framework import serializers

# from apps.accountapp.serializers import CustomUserSerializer
from apps.articleapp.models import Article
from apps.productapp.serializers import ProductArticleSerializer, ProductSerializer


class ArticleSaveSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)


class ArticleReadSerializer(serializers.ModelSerializer): # 변수명 바꿔야함
    product = ProductArticleSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ["id", "article_title", "article_content", "product"]