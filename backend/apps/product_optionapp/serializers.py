# 옵션
from rest_framework import serializers
from apps.product_optionapp.models import ProductOption


class ProductOptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductOption
        fields = '__all__'
