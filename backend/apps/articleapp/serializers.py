from rest_framework import serializers

from apps.accountapp.models import CustomUser
from apps.articleapp.models import Article
from apps.productapp.models import Product
from apps.productapp.serializers import ProductSerializer


class UesrSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'nickname']


#  ----------------------------------------------------------------------

class ArticleListSerializer(serializers.ModelSerializer):
    user = UesrSerializer(read_only = True)

    class Meta:
        model = Article
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)
