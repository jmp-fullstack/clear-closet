from rest_framework import serializers

from apps.reviewapp.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'buyer', 'seller', 'review_title', 'review_content', 'created_at']
        read_only_fields = ['id', 'created_at', 'buyer', 'seller']