from rest_framework import serializers

from apps.accountapp.models import CustomUser
from apps.accountapp.serializers import SignupSerializer
from apps.articleapp.models import Article

class UesrSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        field = ('id', 'nickname')


class ArticleListSerializer(serializers.ModelSerializer):
    user = UesrSerializer(read_only = True)

    class Meta:
        model = Article
        field = '__all__'
