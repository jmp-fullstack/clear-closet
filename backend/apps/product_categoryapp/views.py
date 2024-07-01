from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from apps.product_categoryapp.models import ProductCategory
from apps.product_categoryapp.serializers import ProductCategorySerializer
from apps.product_optionapp.serializers import ProductOptionSerializer
# Create your views here.

@api_view(['GET','POST'])
def product_category(request):
    if request.method == 'GET' :
        top_category = request.GET['top_category']
        bottom_category = request.GET['bottom_category']
        queryset = ProductCategory.objects.filter(top_category=top_category, bottom_category=bottom_category).first()
        serializer = ProductCategorySerializer(queryset)
        return Response(serializer.data)
    
    # 임시 데이터 넣고 폐기 예정
    if request.method == 'POST':
        print(request.data)
        serializer = ProductCategorySerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)