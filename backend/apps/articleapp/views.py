from django.shortcuts import get_list_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from apps.articleapp.models import Article
from apps.articleapp.serializers import ArticleListSerializer
# Create your views here.


@api_view(['GET'])
def article_list(request):
    articles = get_list_or_404(Article)
    serializer = ArticleListSerializer(articles, many=True)
    return Response(serializer.data)

