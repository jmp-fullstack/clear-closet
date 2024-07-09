from django.db import models

from apps.product_categoryapp.models import ProductCategory
from apps.product_optionapp.models import ProductOption

# Create your models here.

class Product(models.Model):
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE,related_name='category', null=True, blank=True)
    option = models.ForeignKey(ProductOption, on_delete=models.CASCADE,related_name='option', null=True, blank=True)
    product_title = models.CharField(max_length=255)
    price = models.IntegerField()
    brand = models.CharField(max_length=255, default="노브랜드")
    connect_url = models.TextField()
    product_type = models.IntegerField(default=0) # 중고-0, 무신사-1, 세컨드웨어-2
    product_status = models.CharField(max_length=50) # 제품상태 : 강제로 카테고리화 -> 우리가 정해야하는것 ex) 사용감 있는 깨끗한 상품
    create_at = models.DateField(auto_now_add=True)