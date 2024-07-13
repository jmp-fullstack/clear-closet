from rest_framework import serializers

from apps.commentapp.models import Comment
from apps.accountapp.serializers import UserProfileSerializer

class CommentSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'article', 'comment', 'created_at','updated_at']
        read_only_fields = ['id', 'user','article','created_at','updated_at']
        
