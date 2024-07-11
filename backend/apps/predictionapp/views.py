# from utils.yolo_effnet_utils import extract_main_sub_color_effnet_layer
# from rest_framework.decorators import api_view, authentication_classes, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here
# @authentication_classes([JWTAuthentication])
# @permission_classes([IsAuthenticated])
# @api_view(['POST'])
# def image_classifier_model(request):
#     global yolov5_model, effnet_v2_s_model, device
    
#     user_input_image = request.FILES.get("image")[0]
#     if user_input_image:
#         # main_color, sub_color = extract_main_sub_color_effnet_layer(user_input_image, yolov5_model, effnet_v2_s_model, device)
        
#     return main_color, sub_color

    # return topcategory, bottomcategory, color

    # 3번째 모델 input : topcategory, bottomcategory, color, brand
    # 3번째 모델 output : return price_range

    # return 값으로 가져와야하는것
    # product에서 : product_category(topcategory, bottomcategory), product_option(color, size)중
    # color만 있음 table에서 필터 한번하고, product에서 브랜드 필터하고, product에서 price range를 활용해서 price 필터
    # order by 정렬후 type=0, type=1 상위 3개 보여주기

