from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from apps.accountapp.serializers import ChangePasswordSerializer, FindEmailSerializer, FindPasswordSerializer, LoginSerializer, SignupSerializer
from django.contrib.auth import get_user_model, authenticate

#로그인
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        
        user = authenticate(email=email, password=password)
        if user is None:
            return Response({"message": "존재하지 않는 아이디이거나 비밀번호가 틀렸습니다."}, status=status.HTTP_400_BAD_REQUEST)
        
        refresh = RefreshToken.for_user(user)
        access_token = f'Bearer {refresh.access_token}'
        
        response = Response(
            {"user": LoginSerializer(user).data, "message": "login Success",
            "accessToken": access_token},
            status=status.HTTP_200_OK
        )

        response.set_cookie(key='refresh_token', value=str(refresh), httponly=True, secure=False)
        return response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 회원가입
@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    serializer = SignupSerializer(data=request.data)

    # prod 단계에선 로직 추가 해야함
    if len(password) < 10:
        return Response({"error": "패스워드는 10자 이상이어야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
    
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(password)
        user.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 로그아웃
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({"message": "refresh_token 없음"}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken(refresh_token)
        refresh.blacklist()

        response = Response({"message": "로그아웃 성공!"}, status=status.HTTP_205_RESET_CONTENT)
        response.delete_cookie('refresh_token')
        return response
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# 아이디(이메일) 찾기
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def find_user(request):

    serializer = FindEmailSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        return Response({'email': email})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 비밀번호 재설정 인증
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def find_password(request):
    serializer = FindPasswordSerializer(data=request.data)
    if serializer.is_valid():
        reset_token = AccessToken.for_user(request.user)
        response = Response(status=status.HTTP_200_OK)
        response.set_cookie(key='reset_token', value=str(reset_token), httponly=True, secure=False)
        return response # 인증되면 http 200 -> 리다이랙트 (auth/password에서 change/password 페이지로)
    
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


# 비밀번호 재설정
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    new_password = request.data.get('new_password')

    reset_token = AccessToken(request.COOKIES.get('reset_token'))
    access_token = AccessToken(request.META.get('HTTP_AUTHORIZATION').split(' ')[1])

    # 토큰 검증
    if reset_token['user_id'] != access_token['user_id']:
        return Response({"message": "잘못 된 경로로 들어온 사용자들"}, status=status.HTTP_400_BAD_REQUEST)

    user = get_user_model().objects.get(id=reset_token['user_id'])

    # 비밀번호 변경
    serializer = ChangePasswordSerializer(data=request.data)
    if serializer.is_valid():
        user.set_password(new_password)
        user.save()
        response = Response({"message": "비밀번호 변경 완료"}, status=status.HTTP_200_OK)
        response.delete_cookie('reset_token')
        return response
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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