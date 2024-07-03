from django.shortcuts import get_object_or_404
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

from apps.accountapp.models import CustomUser
from apps.accountapp.serializers import ChangePasswordSerializer, FindEmailSerializer, FindPasswordSerializer, LoginSerializer, CustomUserSerializer

#로그인
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
        
        user = authenticate(email=email, password=password)
        if user is None:
            return Response({"error": "존재하지 않는 아이디이거나 비밀번호가 틀렸습니다."}, status=status.HTTP_400_BAD_REQUEST)
        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        response = Response({"message": "login Success","access": access_token}, status=status.HTTP_200_OK)

        response.set_cookie(key='refresh', value=str(refresh), httponly=True, secure=False)
        return response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 회원가입
@api_view(['POST'])
def signup(request):
    data = request.data
    password = data.get('password')

    # 비밀번호 길이 검증
    if not password or len(password) < 10:
        return Response({"error": "패스워드는 10자 이상이어야 합니다."}, status=status.HTTP_400_BAD_REQUEST)

    # 이메일 중복 검증
    if CustomUser.objects.filter(email=data.get('email')).exists():
        return Response({"error": "이미 존재하는 이메일입니다."}, status=status.HTTP_400_BAD_REQUEST)

    # 닉네임 중복 검증
    if CustomUser.objects.filter(nickname=data.get('nickname')).exists():
        return Response({"error": "이미 존재하는 닉네임입니다."}, status=status.HTTP_400_BAD_REQUEST)

    # 전화번호 중복 검증
    if CustomUser.objects.filter(phone_number=data.get('phone_number')).exists():
        return Response({"error": "이미 존재하는 전화번호입니다."}, status=status.HTTP_400_BAD_REQUEST)

    # 유효성 검사 통과 후 사용자 생성
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(password)
        user.save()
        return Response({"message": "회원가입이 완료되었습니다."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 로그아웃
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        refresh_token = request.COOKIES.get('refresh')
        if not refresh_token:
            return Response({"message": "토큰이 존재하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken(refresh_token)
        refresh.blacklist()

        response = Response({"message": "로그아웃 성공!"}, status=status.HTTP_205_RESET_CONTENT)
        response.delete_cookie('refresh')
        return response
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# 아이디(이메일) 찾기
@api_view(["POST"])
def find_user(request):

    serializer = FindEmailSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        return Response({'email': email})
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 비밀번호 재설정 인증
@api_view(['POST'])
def find_password(request):
    serializer = FindPasswordSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        phone_number = serializer.validated_data['phone_number']
        try:
            user = CustomUser.objects.get(username=username, email=email, phone_number=phone_number)
        except CustomUser.DoesNotExist:
            return Response({"message": "존재하지 않는 사용자입니다."}, status=status.HTTP_404_NOT_FOUND)
        
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        response = Response({"message": "비밀번호 재설정 토큰 발급"}, status=status.HTTP_200_OK)
        response.set_cookie('uid', uid, httponly=True, secure=False)
        return response
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 비밀번호 재설정
@api_view(['POST'])
def change_password(request):
    uidb64 = request.COOKIES.get('uid')
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        new_password = serializer.validated_data['new_password']
        
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = CustomUser.objects.get(pk=uid)
        except (CustomUser.DoesNotExist, ValueError, TypeError, OverflowError):
            return Response({"message": "잘못된 토큰입니다."}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        
        response = Response({"message": "비밀번호가 성공적으로 변경되었습니다."}, status=status.HTTP_200_OK)
        response.delete_cookie('uid')
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

