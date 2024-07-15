import torch
import torchvision.models as get_model
import torch.nn as nn
import xgboost as xgb

yolov5_model = None
effnet_v2_s_model = None
device = None
predict_price_model = None

def load_yolov5_model(device):
    yolov5_best_pt_save_path = '/clear-closet/apps/predictionapp/load_ai_models/pt_files/yolo.pt'  # pt 파일 경로
    yolov5_model = torch.hub.load('ultralytics/yolov5', 'custom', path=yolov5_best_pt_save_path)
    yolov5_model.to(device)
    yolov5_model.eval()
    return yolov5_model

def load_efficientnet_model(device):
    effnet_v2_s_model = get_model.efficientnet_v2_s(pretrained=False)
    num_classes = 35
    in_features = effnet_v2_s_model.classifier[1].in_features
    effnet_v2_s_model.classifier[1] = nn.Linear(in_features, num_classes)
    eff_pt_name = '/clear-closet/apps/predictionapp/load_ai_models/pt_files/trained_380_effnet.pt'  # pt 파일 경로
    checkpoint = torch.load(eff_pt_name, map_location=device)
    effnet_v2_s_model.load_state_dict(checkpoint['model_state_dict'])
    effnet_v2_s_model.to(device)
    effnet_v2_s_model.eval()
    return effnet_v2_s_model

def initialize_models():
    global yolov5_model, effnet_v2_s_model, predict_price_model, device
    if yolov5_model is None or effnet_v2_s_model is None:
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        yolov5_model = load_yolov5_model(device)
        effnet_v2_s_model = load_efficientnet_model(device)

        xgb_save_path = '/clear-closet/apps/predictionapp/load_ai_models/pt_files/xgb_predict_price.json' 
        predict_price_model = xgb.XGBClassifier()
        predict_price_model.load_model(xgb_save_path)

        print(f"Using device: {device}")
        print("Models loaded successfully at server startup")