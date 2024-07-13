from rest_framework import serializers

from apps.articleapp.models import Article
from apps.productapp.serializers import ProductArticleSerializer, ProductMatchSerializer


class ArticleSaveSerializer(serializers.ModelSerializer):
    product = ProductMatchSerializer()

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'product']
        read_only_fields = ['id']

class ArticleListSerializer(serializers.ModelSerializer):
    product = ProductArticleSerializer(read_only=True)
    num_favorites = serializers.IntegerField(read_only=True)
    create_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    update_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    nickname = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ["id", "title", "product", 'is_sell', 'num_favorites', 'create_at', 'update_at', 'nickname']
    
    def get_nickname(self, obj):
        return obj.user.nickname


class ArticleDetailSerializer(serializers.ModelSerializer):
    product = ProductArticleSerializer(read_only=True)
    create_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    update_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    num_favorites = serializers.IntegerField(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ['user','product', 'update_at', 'create_at', 'id', 'is_sell']

    def update(self, instance, validated_data):
        product_data = validated_data.pop('product', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if product_data:
            product_instance = instance.product
            for attr, value in product_data.items():
                setattr(product_instance, attr, value)
            product_instance.save()

        return instance