from django.shortcuts import get_list_or_404, get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.articleapp.models import Article
from apps.articleapp.pagination import StandardResultsSetPagination
from apps.articleapp.serializers import ArticleDetailSerializer, ArticleListSerializer, ArticleSaveSerializer
from apps.imageapp.models import TotalImage
from apps.product_categoryapp.models import ProductCategory
from apps.product_optionapp.models import ProductOption
from apps.productapp.serializers import ProductMatchSerializer

# Create your views here.

# 게시글 전체 보기
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def article_list(request):
    top_category = request.query_params.get('top_category')
    bottom_category = request.query_params.get('bottom_category')
    color = request.query_params.get('color')
    sPrice = request.query_params.get('sPrice')
    ePrice = request.query_params.get('ePrice')
    size = request.query_params.get('size')
    isSort = request.query_params.get('isSort', 'asc')

    articles = Article.objects.all()
    
    # 필터
    if top_category:
        articles = articles.filter(product__category__top_category=top_category)
    if bottom_category:
        articles = articles.filter(product__category__bottom_category=bottom_category)
    if color:
        articles = articles.filter(product__option__color=color)
    if sPrice:
        articles = articles.filter(product__price__gte=sPrice)
    if ePrice:
        articles = articles.filter(product__price__lte=ePrice)
    if size:
        articles = articles.filter(product__option__size=size)

    # 정렬
    if isSort == 'desc':
        articles = articles.order_by('-product__price')
    else:
        articles = articles.order_by('product__price')

    # 페이지네이터
    paginator = StandardResultsSetPagination()
    paginated_articles = paginator.paginate_queryset(articles, request)
    
    serializer = ArticleListSerializer(paginated_articles, many=True)
    return paginator.get_paginated_response(serializer.data)


# 게시글 하나 보기
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def article_detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = ArticleDetailSerializer(article)
    return Response(serializer.data)

# 게시글 만들기
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def article_create(request):
    product_data = request.data.get('product')
    # 카테고리 및 옵션 키 발급
    try:
        category_data = product_data.get('category')
        category = ProductCategory.objects.get(top_category=category_data['top_category'], bottom_category=category_data['bottom_category'])
        
        option_data = product_data.get('option')
        option = ProductOption.objects.get(color=option_data['color'], size=option_data['size'])
        
    except (ProductCategory.DoesNotExist, ProductOption.DoesNotExist):
        return Response({"error": "지금은 테스트중이라 옵션이 중첩될 경우 objects.get이라 에러 발생"}, status=status.HTTP_400_BAD_REQUEST)
    
    product_data['category'] = category.id
    product_data['option'] = option.id
    product_data['product_title'] = request.data.get('title')

    # 제품 먼저 검사
    product_serializer = ProductMatchSerializer(data=product_data)

    if product_serializer.is_valid():
        product = product_serializer.save()
    else:
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    article_serializer = ArticleSaveSerializer(data=request.data)
    print(request.data)
    # 이미지 검사
    image_urls = product_data.get('product_image', [])
    for image_url in image_urls:
        image_instance = TotalImage.objects.create(image_url=image_url)
        product.product_images.add(image_instance)

    article_serializer = ArticleSaveSerializer(data=request.data)

    # 아티클 검사
    if article_serializer.is_valid():
        article_serializer.save(user=request.user, product=product)
        return Response(article_serializer.data, status=status.HTTP_201_CREATED)
    return Response(article_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 게시글 삭제하기
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def article_delete(request, article_pk):
    article = get_object_or_404(Article, id=article_pk)
    if request.user == article.user:
        article.delete()
        return Response({"message":"삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)
    else: 
        return Response({"message":"권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PATCH'])
def article_update(request, article_pk):
    article = get_object_or_404(Article, id=article_pk)
    if request.user != article.user:
        return Response({"message": "권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)

    serializer = ArticleDetailSerializer(article, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)