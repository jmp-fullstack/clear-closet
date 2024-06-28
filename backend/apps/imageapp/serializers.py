from rest_framework import serializers

from apps.accountapp.models import CustomUser
from apps.imageapp.models import TotalImage
from apps.productapp.models import Product

class TotalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalImage
        fields = '__all__'