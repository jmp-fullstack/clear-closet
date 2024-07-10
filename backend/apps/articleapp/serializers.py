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
    num_favorites = serializers.IntegerField(read_only=True)

    class Meta:
        model = Article
        fields = ["id", "title", "product", 'is_sell', 'num_favorites']


class ArticleDetailSerializer(serializers.ModelSerializer):
    product = ProductArticleSerializer()

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ['user', 'product', 'update_at', 'create_at', 'id', 'is_sell']

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