from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from accountapp.models import CustomUser
from accountapp.serializers import UserSerializer

# 회원가입
@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    serializer = UserSerializer(data=request.data)

    if len(password) < 10:
        return Response({"error": "패스워드는 10자 이상이어야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
    
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(password)
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 로그아웃
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def logout(request):
    return Response({"message": "로그아웃 되었습니다."}, status=status.HTTP_200_OK)


# 아이디 찾기
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def find_user(request):
    email = request.data.get('email')
    phone_number = request.data.get('phone_number')

    if request.user.email == email and request.user.phone_number == phone_number:
        context = {
            'username': request.user.username
        }
        return Response(context, status=status.HTTP_200_OK)
    return Response({"detail": "User not found or not authorized"}, status=status.HTTP_404_NOT_FOUND)

