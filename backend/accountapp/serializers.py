from rest_framework import serializers
from accountapp.models import CustomUser 


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'nickname', 'email', 'phone_number']
        extra_kwargs = {'password': {'write_only': True},'phone_number': {'write_only': True},'email' : {'write_only': True}}
        
        def create(self, validated_data):
            return CustomUser.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


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


class ChangePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)

    def validate_new_password(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("비밀번호는 최소 10자 이상이어야 합니다.")
        return value