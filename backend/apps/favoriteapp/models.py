from django.db import models

from apps.accountapp.models import CustomUser
from apps.articleapp.models import Article

# Create your models here.


class Favorite(models.Model):
    article_id = models.ForeignKey(Article, on_delete=models.CASCADE)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    create_at = models.DateField(auto_now_add=True)