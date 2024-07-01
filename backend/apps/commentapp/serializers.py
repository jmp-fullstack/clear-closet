from rest_framework import serializers

from apps.commentapp.models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'article', 'comment', 'created_at', 'update_at']
        read_only_fields = ['id', 'user', 'created_at', 'update_at', 'article']
        
