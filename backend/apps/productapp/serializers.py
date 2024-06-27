# 제품
from rest_framework import serializers
from apps.product_categoryapp.serializers import ProductCategorySerializer
from apps.product_optionapp.serializers import ProductOptionSerializer
from apps.productapp.models import Product


class ProductSerializer(serializers.ModelSerializer):
    # product_category = ProductCategorySerializer()
    # product_option = ProductOptionSerializer()
    # product_images = serializers.ListField(
    #     child=serializers.URLField(),
    #     required=False
    # )

    class Meta:
        model = Product
        fields = '__all__'
