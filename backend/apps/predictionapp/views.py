import torch
import torch.hub
from utils.yolo_effent_models import load_efficientnet_model, load_yolov5_model
from utils.yolo_effnet_utils import extract_main_sub_color_effnet_layer

# Create your views here
def image_classifier_model(request):
    image = request.FILES["image"]

    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    yolov5_model = load_yolov5_model('yolo_best.pt', device)
    effnet_v2_s_model = load_efficientnet_model('trained_260_effnet.pt', 38, device)

    user_input_image = image

    extract_main_sub_color_effnet_layer(user_input_image, yolov5_model, effnet_v2_s_model, device) 
    # return topcategory, bottomcategory, color

    # 3번째 모델 input : topcategory, bottomcategory, color, brand
    # 3번째 모델 output : return price_range

    # return 값으로 가져와야하는것
    # product에서 : product_category(topcategory, bottomcategory), product_option(color, size)중
    # color만 있음 table에서 필터 한번하고, product에서 브랜드 필터하고, product에서 price range를 활용해서 price 필터
    # order by 정렬후 type=0, type=1 상위 3개 보여주기

