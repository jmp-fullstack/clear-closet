# 옵션
from backend.apps.accountapp import serializers
from backend.apps.product_optionapp.models import ProductOption


class ProductOptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductOption
        field = '__all__'
