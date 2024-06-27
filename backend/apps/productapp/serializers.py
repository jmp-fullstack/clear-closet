# 제품
from backend.apps.accountapp import serializers
from backend.apps.product_categoryapp.serializers import ProductCategorySerializer
from backend.apps.product_optionapp.serializers import ProductOptionSerializer
from backend.apps.productapp.models import Product


class ProductSerializer(serializers.ModelSerializer):
    product_category = ProductCategorySerializer()
    product_option = ProductOptionSerializer()

    class Meta:
        model = Product
        field = '__all__'
