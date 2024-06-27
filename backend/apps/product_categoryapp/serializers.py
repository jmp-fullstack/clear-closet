from rest_framework import serializers
from apps.product_categoryapp.models import ProductCategory


class ProductCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductCategory
        field = '__all__'


