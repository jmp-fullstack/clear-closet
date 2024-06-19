from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from accountapp.models import CustomUser
from accountapp.serializers import UserSerializer

# Create your views here.
# 로그인
# @api_view(['POST'])
# def login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     user = CustomUser.objects.filter(username=username).first()

#     if user is None:
#         return Response(
#             {"message": "존재하지 않는 아이디입니다."}, status=status.HTTP_400_BAD_REQUEST
#         )

#     if not user.check_password(password):
#         return Response(
#             {"message": "비밀번호가 틀렸습니다"}, status=status.HTTP_400_BAD_REQUEST
#         )

#     token = RefreshToken.for_user(user)
#     access_token = str(token.access_token)
#     refresh_token = str(token)

#     response = Response(
#         {
#             "user": UserSerializer(user).data,
#             "message": "login Success",
#             "jwt_token": {
#                 "access_token": access_token,
#                 "refresh_token": refresh_token
#             },
#         },
#         status=status.HTTP_200_OK
#     )
#     response.set_cookie("access_token", access_token, httponly=True)
#     response.set_cookie("refresh_token", access_token, httponly=True)

#     return response

# 회원가입
@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    serializer = UserSerializer(data=request.data)

    if len(password) < 10:
        return Response({"error": "패스워드는 10자 이상이어야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
    
    # if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
    #     return Response({"error": "패스워드는 특수문자를 포함해야 합니다."}, status=status.HTTP_400_BAD_REQUEST)

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
    # Authorization 헤더에서 토큰 가져오기
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return Response({"message": "유효하지 않은 사용자"}, status=status.HTTP_400_BAD_REQUEST)

    response = Response({"message": "로그아웃 되었습니다."}, status=status.HTTP_200_OK)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response

