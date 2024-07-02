from rest_framework import serializers

from apps.imageapp.models import TotalImage
from apps.productapp.models import Product

class TotalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalImage
        fields = ['id','image_url']


class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalImage
        fields = ['id', 'user_id', 'image_url']