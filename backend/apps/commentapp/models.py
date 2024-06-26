from django.db import models

from backend.apps.accountapp.models import CustomUser
from backend.apps.articleapp.models import Article

# Create your models here.

class Comment(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    article_id = models.ForeignKey(Article, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)