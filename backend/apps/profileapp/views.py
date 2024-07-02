from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.accountapp.models import CustomUser
from apps.accountapp.serializers import  UserProfileSerializer
from apps.articleapp.models import Article
from apps.articleapp.serializers import ArticleListSerializer
from apps.imageapp.models import TotalImage
from apps.imageapp.serializers import ProfileImageSerializer

# Create your views here.

# 내 프로필 정보
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET', 'PATCH'])
def user_profile(request, user_pk):
    try:
        user = CustomUser.objects.get(pk=user_pk)
    except CustomUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)
    
    if request.method == 'PATCH':
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "프로필 변경 완료", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 내 프로필사진 업데이트
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PATCH'])
def update_profile_image(request, user_id):
    print(request)
    print(user_id)
    try:
        user = CustomUser.objects.get(pk=user_id)
    except CustomUser.DoesNotExist:
        return Response({"message": "오류가 여기인가?"},status=status.HTTP_404_NOT_FOUND)

    try:
        profile_image = user.profile_images
    except TotalImage.DoesNotExist:
        profile_image = TotalImage(user=user)

    serializer = ProfileImageSerializer(profile_image, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "프로필 이미지 변경 완료", "data": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 내 판매목록 조회
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def article_sales_list(request, user_id):
    try:
        articles = Article.objects.filter(user=user_id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = ArticleListSerializer(articles, many=True)
    return Response(serializer.data)