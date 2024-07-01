from rest_framework import serializers

from apps.articleapp.serializers import ArticleReadSerializer
from apps.favoriteapp.models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    article = ArticleReadSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = '__all__'