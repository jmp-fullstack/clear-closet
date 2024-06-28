from django.urls import path
from apps.product_optionapp.views import product_option

urlpatterns = [
    path('', product_option, name='product_option'),
]