from django.db import models
from apps.accountapp.models import CustomUser

# Create your models here.

class Review(models.Model):
    buyer = models.ForeignKey(CustomUser, related_name='buyer', on_delete=models.CASCADE)
    seller = models.ForeignKey(CustomUser, related_name='seller', on_delete=models.CASCADE)
    review_title = models.CharField(max_length=255)
    review_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)