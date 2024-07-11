import json
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.db import transaction
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
    bottom_categories = request.query_params.getlist('bottom_category')
    colors = request.query_params.getlist('color')
    sPrice = request.query_params.get('sPrice')
    ePrice = request.query_params.get('ePrice')
    sizes = request.query_params.getlist('size')
    isSort = request.query_params.get('isSort')
    isDate = request.query_params.get('isDate','desc')

    articles = Article.objects.filter(is_sell=True)
    
    # 필터
    if top_category:
        articles = articles.filter(product__category__top_category=top_category)
    if bottom_categories:
        articles = articles.filter(product__category__bottom_category__in=bottom_categories)
    if colors:
        articles = articles.filter(product__option__color__in=colors)
    if sPrice:
        articles = articles.filter(product__price__gte=sPrice)
    if ePrice:
        articles = articles.filter(product__price__lte=ePrice)
    if sizes:
        articles = articles.filter(product__option__size__in=sizes)

    # 정렬
    sort_order = '-product__price' if isSort == 'desc' else 'product__price'
    date_order = '-create_at' if isDate == 'desc' else 'create_at'
    articles = articles.order_by(date_order, sort_order)

    if isSort != 'none' and isDate != 'none':
        articles = articles.annotate(num_favorites=Count('favorite')).order_by(sort_order, date_order)
    elif isSort != 'none':
        articles = articles.annotate(num_favorites=Count('favorite')).order_by(sort_order)
    elif isDate != 'none':
        articles = articles.annotate(num_favorites=Count('favorite')).order_by(date_order)
    else:
        articles = articles.annotate(num_favorites=Count('favorite'))
        
    # 페이지네이터
    paginator = StandardResultsSetPagination()
    paginated_articles = paginator.paginate_queryset(articles, request)
    
    serializer = ArticleListSerializer(paginated_articles, many=True)
    return paginator.get_paginated_response(serializer.data)


# 게시글 기능
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def article_create(request):
    try:
        product_data = request.data.get('product')
        if not product_data:
            raise ValueError("Invalid product data")
    except (json.JSONDecodeError, TypeError, ValueError):
        return Response({"error": "유효하지 않은 제품 데이터입니다."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with transaction.atomic():
            # 카테고리 및 옵션 키 발급
            category_data = product_data.get('category')
            category = ProductCategory.objects.get(top_category=category_data['top_category'], bottom_category=category_data['bottom_category'])
            
            option_data = product_data.get('option')
            option = ProductOption.objects.get(color=option_data['color'], size=option_data['size'])

            product_data['category'] = category.id
            product_data['option'] = option.id
            product_data['product_title'] = request.data.get('title')

            # 제품 먼저 검사
            product_serializer = ProductMatchSerializer(data=product_data)

            if product_serializer.is_valid():
                product = product_serializer.save()
            else:
                return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # 요청 데이터에 업로드된 이미지 정보 테이블에 추가
            image_urls = product_data.get('image_urls', [])
            product_images = []
            for url in image_urls:
                total_image = TotalImage.objects.create(image_url=url)
                total_image.product.add(product)
                product_images.append({'image_url': url})
            product_data['product_images'] = product_images

            # 아티클 검사 및 저장
            article_data = {
                'title': request.data.get('title'),
                'content': request.data.get('content'),
                'product': product_data
            }
            article_serializer = ArticleSaveSerializer(data=article_data)
            if article_serializer.is_valid():
                article_serializer.save(user=request.user, product=product)
                return Response(article_serializer.data, status=status.HTTP_201_CREATED)
            return Response(article_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except (ProductCategory.DoesNotExist, ProductOption.DoesNotExist):
        return Response({"error": "유효하지 않은 카테고리 또는 옵션입니다."}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"서버 오류: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# 게시글 기능
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def article_detail(request, article_pk):
    annotated_articles = Article.objects.annotate(num_favorites=Count('favorite'))
    article = get_object_or_404(annotated_articles, pk=article_pk)
    serializer = ArticleDetailSerializer(article)
    return Response(serializer.data)


# 게시글 삭제
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def article_delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        article.delete()
        return Response({"message":"삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)
    else: 
        return Response({"message":"권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)
        

# 게시글 수정
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PATCH'])
def article_modify(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user != article.user:
        return Response({"message": "권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = ArticleDetailSerializer(article, data=request.data, context={'request': request}, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 판매중, 판매완료
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def article_is_sell(request, article_pk):
    user = request.user
    try:
        article = Article.objects.get(id=article_pk)
    except Article.DoesNotExist:
        return Response({"error": "페이지를 찾을 수 없음"}, status=status.HTTP_404_NOT_FOUND)

    if article.user != user:
        return Response({"error": "권한이 없습니다"}, status=status.HTTP_403_FORBIDDEN)

    if article.is_sell:
        article.is_sell = False
        article.save()
        return Response({"message": "판매완료"}, status=status.HTTP_200_OK)
    else:
        article.is_sell = True
        article.save()
        return Response({"message": "판매중"}, status=status.HTTP_201_CREATED)