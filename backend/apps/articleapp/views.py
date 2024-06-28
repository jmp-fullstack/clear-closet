from django.shortcuts import get_list_or_404

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.articleapp.models import Article
from apps.articleapp.serializers import ArticleListSerializer, ArticleSerializer
from apps.imageapp.models import TotalImage
from apps.product_categoryapp.models import ProductCategory
from apps.product_categoryapp.serializers import ProductCategorySerializer
from apps.product_optionapp.models import ProductOption
from apps.product_optionapp.serializers import ProductOptionSerializer
from apps.productapp.serializers import ProductSerializer

# Create your views here.


@api_view(['GET'])
def article_list(request):
    articles = get_list_or_404(Article)
    serializer = ArticleListSerializer(articles, many=True)
    return Response(serializer.data)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def article_detail(request):
    product_data = request.data.get('product')
    
    # 카테고리 및 옵션 키 발급
    try:
        category_data = product_data.get('category')
        category = ProductCategory.objects.get(top_category=category_data['top_category'], bottom_category=category_data['bottom_category'])
        
        option_data = product_data.get('option')
        option = ProductOption.objects.get(color=option_data['color'], size=option_data['size'])
        print(category, option)
    except (ProductCategory.DoesNotExist, ProductOption.DoesNotExist):
        return Response({"error": "지금은 테스트중이라 옵션이 중첩될 경우 objects.get이라 에러 발생"}, status=status.HTTP_400_BAD_REQUEST)
    
    product_data['category'] = category.id
    product_data['option'] = option.id

    # 제품 먼저 검사
    product_serializer = ProductSerializer(data=product_data)

    if product_serializer.is_valid():
        product = product_serializer.save()
    else:
        return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    article_serializer = ArticleSerializer(data=request.data)
    
    # 이미지 검사
    image_urls = product_data.get('product_image', [])
    for image_url in image_urls:
        image_instance = TotalImage.objects.get_or_create(image_url=image_url)
        product.product_images.add(image_instance)

    article_serializer = ArticleSerializer(data=request.data)

    # 아티클 검사
    if article_serializer.is_valid():
        article_serializer.save(user=request.user, product=product)
        return Response(article_serializer.data, status=status.HTTP_201_CREATED)
    return Response(article_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
