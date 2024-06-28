# 제품
from rest_framework import serializers
from apps.imageapp.serializers import TotalImageSerializer
from apps.product_optionapp.models import ProductOption
from apps.product_categoryapp.models import ProductCategory
from apps.productapp.models import Product


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=ProductCategory.objects.all())
    option = serializers.PrimaryKeyRelatedField(queryset=ProductOption.objects.all())
    product_images = TotalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

