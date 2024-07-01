from rest_framework import serializers

from apps.articleapp.serializers import ArticleListSerializer
from apps.favoriteapp.models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    article = ArticleListSerializer(read_only=True)

    class Meta:
        model = Favorite
        fields = '__all__'