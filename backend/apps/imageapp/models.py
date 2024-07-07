from django.db import models

from apps.productapp.models import Product
from apps.accountapp.models import CustomUser

# Create your models here.

class TotalImage(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile_images', null=True, blank=True)
    product = models.ManyToManyField(Product, related_name='product_images', blank=True)
    image_url = models.URLField(null=True, blank=True)