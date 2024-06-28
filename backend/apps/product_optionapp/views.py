from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from apps.product_optionapp.models import ProductOption
from apps.product_optionapp.serializers import ProductOptionSerializer
# Create your views here.

@api_view(['GET','POST'])
def product_option(request):
    if request.method == 'GET' :
        color = request.GET['color']
        size = request.GET['size']
        queryset = ProductOption.objects.filter(color=color, size=size).first()
        serializer = ProductOptionSerializer(queryset)
        return Response(serializer.data)
    
    # 임시 데이터 넣고 폐기 예정
    if request.method == 'POST':
        product_option_serializer = ProductOptionSerializer(data=request.data)
        print(product_option_serializer)
        if product_option_serializer.is_valid():
            product_option_serializer.save()
            return Response(product_option_serializer.data, status=status.HTTP_201_CREATED)