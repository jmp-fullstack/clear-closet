from backend.apps.accountapp import serializers
from backend.apps.product_categoryapp.models import ProductCategory


class ProductCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductCategory
        field = '__all__'


