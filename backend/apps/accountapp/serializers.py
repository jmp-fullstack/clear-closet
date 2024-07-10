from backend import settings
from rest_framework import serializers
from apps.accountapp.models import CustomUser
from apps.imageapp.models import TotalImage
from apps.imageapp.serializers import TotalImageSerializer

# 회원가입
class CustomUserSerializer(serializers.ModelSerializer):
    profile_images = TotalImageSerializer(required=False, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'nickname', 'email', 'phone_number', 'profile_images']
        extra_kwargs = {
            'phone_number':{'write_only': True},
            'password': {'write_only': True},
            'email': {'write_only': True}
        }
     
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        profile_image_data = {
            'user': user,
            'image_url': settings.DEFAULT_PROFILE_IMAGE_URL
        }
        profile_image = TotalImage.objects.create(**profile_image_data)
        user.profile_images = profile_image
        user.save()
        return user

# 로그인 정보값
class UserDetailSerializer(serializers.ModelSerializer):
    profile_images = TotalImageSerializer()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'nickname', 'profile_images']

# 로그인 인증
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

# 이메일
class FindEmailSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    phone_number = serializers.CharField(max_length=15)

    def validate(self, data):
        username = data.get('username')
        phone_number = data.get('phone_number')
        try:
            user = CustomUser.objects.get(username=username, phone_number=phone_number)
            data['email'] = user.email
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("해당 유저 이름과 핸드폰 번호로 등록된 사용자가 없습니다.")
        return data
    
# 패스워드 인증
class FindPasswordSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=15)

    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        phone_number = data.get('phone_number')

        if not CustomUser.objects.filter(username=username, email=email, phone_number=phone_number).exists():
            raise serializers.ValidationError("사용자를 찾을 수 없습니다.")
        return data

# 패스워드
class ChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)

    def validate_new_password(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("비밀번호는 최소 10자 이상이어야 합니다.")
        return value

# 프로필
class UserProfileSerializer(serializers.ModelSerializer):
    profile_images = TotalImageSerializer()

    class Meta:
        model = CustomUser
        fields = ['id', 'profile_images']

    def update(self, instance, validated_data):
        profile_image_data = validated_data.pop('profile_images', None)
        if profile_image_data:
            image_url = profile_image_data.get('image_url')
            TotalImage.objects.update_or_create(user=instance, defaults={'image_url': image_url})

        instance = super(UserProfileSerializer, self).update(instance, validated_data)
        return instance
