# 제품
from rest_framework import serializers
from apps.imageapp.serializers import TotalImageSerializer
from apps.product_categoryapp.serializers import ProductCategorySerializer
from apps.product_optionapp.models import ProductOption
from apps.product_categoryapp.models import ProductCategory
from apps.product_optionapp.serializers import ProductOptionSerializer
from apps.productapp.models import Product


class ProductMatchSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=ProductCategory.objects.all())
    option = serializers.PrimaryKeyRelatedField(queryset=ProductOption.objects.all())
    product_images = TotalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['category','option','product_title','price','product_type','product_status','product_images', 'brand']
        read_only_fields = ['id','category','option']


class ProductArticleSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)
    option = ProductOptionSerializer(read_only=True)
    product_images = TotalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['price', 'category', 'option','product_images','brand','product_status']


