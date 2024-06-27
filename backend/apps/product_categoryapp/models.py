from django.db import models

# Create your models here.

class ProductCategory(models.Model):
    top_category = models.CharField(max_length=50)
    bottom_category = models.CharField(max_length=50)
