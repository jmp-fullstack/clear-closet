from django.db import models

from apps.accountapp.models import CustomUser
from apps.productapp.models import Product

# Create your models here.

class Article(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.OneToOneField(Product, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    is_sell = models.BooleanField(default=1) 
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)