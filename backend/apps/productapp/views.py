# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# from .serializers import ProductSerializer
# # Create your views here.

# @api_view(['POST'])
# def product_detail(request):
#     goods_attributes = request.query_params.get('goodsAttributes', None)
#     if goods_attributes:
#         attributes = goods_attributes.split(',')
#         products = Product.objects.filter(attribute__name__in=attributes)
#     else:
#         products = Product.objects.all()
    
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)