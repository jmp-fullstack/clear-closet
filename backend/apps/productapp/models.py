from django.db import models

from backend.apps.articleapp.models import Article
from backend.apps.product_categoryapp.models import ProductCategory
from backend.apps.product_optionapp.models import ProductOption

# Create your models here.

class Product(models.Model):
    article_id = models.OneToOneField(Article, on_delete=models.CASCADE)
    category_id = models.ForeignKey(ProductCategory, on_delete=models.CASCADE)
    option_id = models.ForeignKey(ProductOption, on_delete=models.CASCADE)
    price = models.IntegerField()
    connect_url = models.TextField()
    product_type = models.BooleanField(default=0) # 중고인지(0) 새상품인지(1) 식별
    product_status = models.CharField(max_length=50) # 제품상태 : 강제로 카테고리화 -> 우리가 정해야하는것 ex) 사용감 있는 깨끗한 상품