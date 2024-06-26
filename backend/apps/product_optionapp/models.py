from django.db import models

# Create your models here.

class ProductOption(models.Model):
    color = models.CharField(max_length=20)
    size = models.CharField(max_length=20)