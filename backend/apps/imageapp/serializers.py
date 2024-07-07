from rest_framework import serializers

from apps.imageapp.models import TotalImage

class TotalImageSerializer(serializers.ModelSerializer):
    image_url = serializers.URLField()
    
    class Meta:
        model = TotalImage
        fields = ['id', 'image_url']