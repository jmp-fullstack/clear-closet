from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from accountapp.models import CustomUser
from accountapp.serializers import UserSerializer
from django.contrib.auth import get_user_model

#로그인
@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = CustomUser.objects.filter(user_id=user_id).first()

    if email is None:
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

    if not request.user.email == email:
        return Response({"message": "이메일이 일치하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)
    elif request.user.phone_number == phone_number:
        return Response({"message": "핸드폰 번호가 일치하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)
    context = {
        'username': request.user.username
    }
    return Response(context, status=status.HTTP_200_OK)


# 비밀번호 재설정 인증
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def find_passwrod(request):
    username = request.data.get('username')
    email = request.data.get('email')
    phone_number = request.data.get('phone_number')

    user = get_user_model().objects.get(username=username, email=email, phone_number=phone_number)
    refresh = RefreshToken.for_user(user)
    if user:
        return Response({'redirect': '/password/find','token': str(refresh.access_token)}, status=status.HTTP_200_OK)
    return Response({"message": "사용자를 찾을수 없습니다."}, status=status.HTTP_404_NOT_FOUND)


# 비밀번호 재설정
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def change_password(request):
    new_password = request.data.get('new_password')
    user = request.user
    user.set_password(new_password)
    user.save()
    return Response({"message": "비밀번호 변경 완료"}, status=status.HTTP_200_OK)


# 유저 삭제
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['DELETE'])
def delete_user(request, user_pk):
    user = get_object_or_404(get_user_model(), pk=user_pk)
    if user == request.user:
        user.delete()
        return Response({"message": "회원 탈퇴 되었습니다"}, status=status.HTTP_200_OK)
    return Response({"message": "자기 자신의 계정만 삭제 가능합니다."}, status=status.HTTP_400_BAD_REQUEST)