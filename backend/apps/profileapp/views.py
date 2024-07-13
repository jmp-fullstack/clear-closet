from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.accountapp.models import CustomUser
from apps.accountapp.serializers import  UserDetailSerializer, YourDetailSerializer
from apps.articleapp.models import Article
from apps.articleapp.serializers import ArticleListSerializer

# Create your views here.
# 프로필 정보
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_user_profile(request, user_pk):
    try:
        user = CustomUser.objects.get(pk=user_pk)
    except CustomUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if user == request.user:
        serializer = UserDetailSerializer(user)
    else:
        serializer = YourDetailSerializer(user)
    return Response(serializer.data)

# 프로필 수정
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['PATCH'])
def update_user_profile(request, user_pk):
    try:
        user = CustomUser.objects.get(pk=user_pk)
    except CustomUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if user != request.user:
        return Response({"detail": "자신의 프로필만 수정할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)
    
    serializer = UserDetailSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "프로필 변경 완료", "data": serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 내 판매목록 조회
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def article_sales_list(request, user_pk):
    isSell = request.query_params.get('isSell')
    try:
        if isSell == "true": 
            articles = Article.objects.filter(user=user_pk, is_sell=True)
        elif isSell == "false":
            articles = Article.objects.filter(user=user_pk, is_sell=False)
        else:
            return Response({"detail": "Invalid isSell parameter. Use 'true' or 'false'."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Article.DoesNotExist:
        return Response({"detail": "User or articles not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)