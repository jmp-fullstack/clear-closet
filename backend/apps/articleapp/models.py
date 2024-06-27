from django.db import models

from apps.accountapp.models import CustomUser
from apps.productapp.models import Product

# Create your models here.

class Article(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_id = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='article')
    article_title = models.CharField(max_length=255)
    article_content = models.TextField()
    is_sell = models.BooleanField(default=1) 
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)
