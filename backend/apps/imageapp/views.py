from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.accountapp.serializers import UserProfileSerializer
from .utils.s3_image_uploader import S3ImageUploader

# 유저 프로필
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def user_upload_image(request):
    try:
        image = request.FILES["image"]
    except KeyError as e:
        return Response({'error': f'Missing key: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    data = {}
    user = request.user

    size = (500, 500) # 이미지 사이즈 지정

    try:
        url = S3ImageUploader(image, 'user_profile', size).resize_upload()
    except Exception as e:
        return Response({'error': f'이미지 업로드 실패: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    serializer = UserProfileSerializer(user, data={"profile_images": {"image_url": url}}, partial=True)

    if serializer.is_valid():
        serializer.save()
        data["url"] = url
        return Response(data)
    else:
        data["error"] = "Invalid data"
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    

# 제품 업로드
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def product_upload_images(request):
    image_files = request.FILES.getlist('images')  # 여러 이미지 파일을 처리하기 위해 getlist 사용

    if len(image_files) > 5:
        return Response({"error": "이미지는 최대 5장까지 업로드 가능"}, status=status.HTTP_400_BAD_REQUEST)

    uploaded_images = []
    size = (416, 416)

    for image in image_files:
        try:
            url = S3ImageUploader(image, 'user_product', size).resize_upload()
            uploaded_images.append({"image_url": url})
        except Exception as e:
            return Response({"error": f"이미지 업로드 실패: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"uploaded_images": uploaded_images}, status=status.HTTP_201_CREATED)