from django.db import models

# Create your models here.

class ProductCategory(models.Model):
    top_category = models.CharField(max_length=20)
    bottom_category = models.CharField(max_length=30)
