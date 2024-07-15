from apps.predictionapp.serializers import ModelSerializers
from apps.productapp.models import Product
from rest_framework.response import Response
from .load_ai_models.models_output_utils import extract_main_sub_color_price_range
from .load_ai_models.models_load import yolov5_model, effnet_v2_s_model, predict_price_model, device
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from PIL import Image
import io


# # Create your views here 
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def image_classifier_model(request):
    user_input_image = request.FILES.get("image")
    brand_name = request.data.get('product_brand')
    product_status = request.data.get('product_status')

    if not user_input_image:
        return Response({"error": "이미지가 제공되지 않았습니다"}, status=400)
    
    if not brand_name or not product_status:
        return Response({"error": "브랜드 이름, 상품 상태를 모두 입력해주세요"}, status=400)

    image = Image.open(io.BytesIO(user_input_image.read()))

    top_category, bottom_category, main_color, s_price, e_price = extract_main_sub_color_price_range(
        image, yolov5_model, effnet_v2_s_model, predict_price_model, brand_name, product_status, device
    )

    if product_status == "새 상품(미개봉)":
        s_price, e_price * 0.95

    if product_status == "거의 새상품":
        s_price, e_price * 0.85

    if product_status == "사용감 있는 깨끗한 상품":
        s_price, e_price * 0.8
        
    if product_status == "사용흔적이 많이 있는 상품":
        s_price, e_price * 0.75

    type_0_products = Product.objects.filter(
        product_type=0,
        price__gte=s_price,
        price__lte=int(e_price*1.5),
        category__bottom_category=bottom_category,
        category__top_category=top_category,
        option__color=main_color
    ).order_by('price')[:3]

    type_1_products = Product.objects.filter(
        product_type=1,
        price__gte=int(s_price*2),
        price__lte=int(e_price*2.5),
        category__bottom_category=bottom_category,
        category__top_category=top_category,
        option__color=main_color
    ).order_by('price')[:3]

    type_0_serializer = ModelSerializers(type_0_products, many=True)
    type_1_serializer = ModelSerializers(type_1_products, many=True)

    return Response({
        "s_pirce": s_price,
        "e_price": e_price,
        "our_site_products": type_0_serializer.data,
        "other_site_products": type_1_serializer.data
    })