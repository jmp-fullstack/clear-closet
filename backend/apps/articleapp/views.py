from django.shortcuts import get_list_or_404

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.articleapp.models import Article
from apps.articleapp.serializers import ArticleListSerializer, ArticleSerializer
from apps.productapp.serializers import ProductSerializer

# Create your views here.


@api_view(['GET'])
def article_list(request):
    articles = get_list_or_404(Article)
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def article_detail(request):
    print(request)
    
    product_serializer = ProductSerializer(data=request.data.get('product'))
    print(product_serializer)
    if product_serializer.is_valid():
        product = product_serializer.save()
    else:
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = ArticleSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user, product=product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
