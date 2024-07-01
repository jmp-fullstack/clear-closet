from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.articleapp.models import Article
from apps.reviewapp.models import Review
from apps.reviewapp.serializers import ReviewSerializer


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_review(request, article_id):
    try:
        article = Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return Response({"error": "페이지가 존재 하지않습니다"}, status=status.HTTP_404_NOT_FOUND)

    # 거래가 완료되었는지 확인
    if not article.is_sell:
        return Response({"error": "거래가 완료되지 않음"}, status=status.HTTP_400_BAD_REQUEST)

    # 리뷰 데이터 생성하기
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(buyer=request.user, seller=article.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def list_reviews(request):
    user = request.user
    reviews = Review.objects.filter(buyer=user)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)