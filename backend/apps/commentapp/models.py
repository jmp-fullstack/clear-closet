from django.db import models

from apps.accountapp.models import CustomUser
from apps.articleapp.models import Article

# Create your models here.

class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)