from rest_framework import serializers
from apps.imageapp.serializers import TotalImageSerializer
from apps.product_optionapp.serializers import ProductOptionSerializer
from apps.product_categoryapp.serializers import ProductCategorySerializer
from apps.productapp.models import Product


class ModelSerializers(serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)
    option = ProductOptionSerializer(read_only=True)
    product_images = TotalImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ['price', 'product_title', 'brand', 'connect_url', 'product_type', 'product_images','category','option', 'product_status']
