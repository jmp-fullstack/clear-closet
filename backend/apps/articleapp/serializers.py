from rest_framework import serializers

# from apps.accountapp.serializers import CustomUserSerializer
from apps.articleapp.models import Article
from apps.productapp.serializers import ProductArticleSerializer, ProductMatchSerializer


class ArticleSaveSerializer(serializers.ModelSerializer):
    product = ProductMatchSerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)


class ArticleListSerializer(serializers.ModelSerializer):
    product = ProductArticleSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ["id", "article_title","product"]


class ArticleDetailSerializer(serializers.ModelSerializer):
    product = ProductArticleSerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user','update_at','create_at','id')