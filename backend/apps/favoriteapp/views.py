from django.db.models import Count

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

from apps.articleapp.models import Article
from apps.articleapp.serializers import ArticleListSerializer
from apps.favoriteapp.models import Favorite
from apps.favoriteapp.serializers import FavoriteSerializer

# Create your views here.
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def favorite_article(request, article_id):
    user = request.user
    try:
        article = Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return Response({"error": "페이지을 찾을 수 없음"}, status=status.HTTP_404_NOT_FOUND)
    
    favorite, created = Favorite.objects.get_or_create(user=user, article=article)
    if created:
        return Response({"message": "게시글 좋아요 눌림"}, status=status.HTTP_201_CREATED)
    else:
        favorite.delete()
        return Response({"message": "게시글 좋아요 취소됨"}, status=status.HTTP_200_OK)
    

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def list_favorites(request):
    user = request.user
    favorites = Favorite.objects.filter(user=user)
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def list_top_favorited_articles(request):
    articles = Article.objects.annotate(num_favorites=Count('favorite')).order_by('-num_favorites')
    serializer = ArticleListSerializer(articles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)