from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from accountapp.models import CustomUser
from accountapp.serializers import UserSerializer

# Create your views here.
@api_view(['POST'])
def login(request):
    user_id = request.data.get('user_id')
    password = request.data.get('password')
    user = CustomUser.objects.filter(user_id=user_id).first()

    if user is None:
        return Response(
            {"message": "존재하지 않는 아이디입니다."}, status=status.HTTP_400_BAD_REQUEST
        )

    if not user.check_password(password):
        return Response(
            {"message": "비밀번호가 틀렸습니다"}, status=status.HTTP_400_BAD_REQUEST
        )

    token = RefreshToken.for_user(user)
    access_token = str(token.access_token)
    refresh_token = str(token)

    response = Response(
        {
            "user": UserSerializer(user).data,
            "message": "login Success",
            "jwt_token": {
                "access_token": access_token,
                "refresh_token": refresh_token
            },
        },
        status=status.HTTP_200_OK
    )
    response.set_cookie("access_token", access_token, httponly=True)
    response.set_cookie("refresh_token", access_token, httponly=True)

    return response


@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        user.set_password(password)
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


### 물어봐야할 것 . 테스트 어떻게 할지
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def logout(request):
    token = request.data.get('refresh_token')
    if not token:
        return Response({"message": "유효하지않은 사용자"})
    
    response = Response({"message": "로그아웃 되었습니다."}, status=status.HTTP_200_OK)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response
