from django.urls import path

from apps.product_categoryapp.views import product_category


urlpatterns = [
    path('', product_category, name="product_category")
]
