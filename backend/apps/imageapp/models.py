from django.db import models

from backend.apps.accountapp.models import CustomUser
from backend.apps.productapp.models import Product

# Create your models here.

class TotalImage(models.Model):
    users = models.ManyToManyField(CustomUser, related_name='profile_images')
    products = models.ManyToManyField(Product, related_name='product_images')
    image_url = models.ImageField()
