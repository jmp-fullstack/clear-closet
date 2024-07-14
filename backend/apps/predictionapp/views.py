from apps.predictionapp.serializers import ModelSerializers
from apps.productapp.models import Product
from rest_framework.response import Response
from load_ai_models.models_output_utils import extract_main_sub_color_price_range
from load_ai_models.models_load import yolov5_model, effnet_v2_s_model, predict_price_model, device
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
    print(predict_price_model)

    top_category, bottom_category, main_color, s_price, e_price = extract_main_sub_color_price_range(
        image, yolov5_model, effnet_v2_s_model, predict_price_model, brand_name, product_status, device
    )

    type_0_products = Product.objects.filter(
        product_status=product_status,
        product_type=0,
        price__gte=s_price,
        price__lte=e_price,
        category__bottom_category=bottom_category,
        category__top_category=top_category,
        option__color=main_color
    ).order_by('price')[:3]

    type_1_products = Product.objects.filter(
        product_type=1,
        price__gte=s_price*2,
        price__lte=e_price*2,
        category__bottom_category=bottom_category,
        category__top_category=top_category,
        option__color=main_color
    ).order_by('price')[:3]

    type_0_serializer = ModelSerializers(type_0_products, many=True)
    type_1_serializer = ModelSerializers(type_1_products, many=True)

    return Response({
        "우리 사이트 내의 상품": type_0_serializer.data,
        "다른 사이트의 상품": type_1_serializer.data
    })