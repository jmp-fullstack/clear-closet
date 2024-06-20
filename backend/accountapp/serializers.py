from rest_framework import serializers
from accountapp.models import CustomUser 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'nickname', 'profile_image', 'email', 'phone_number']
        extra_kwargs = {
                        'password': {'write_only': True},
                        'phone_number': {'write_only': True},
                        'email' : {'write_only': True},
                        'profile_image' : {'write_only': True},
                        }   #응답에 포함X 쓰기만 가능

        def create(self, validated_data):
            return CustomUser.objects.create_user(**validated_data)