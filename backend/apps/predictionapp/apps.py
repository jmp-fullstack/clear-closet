from django.apps import AppConfig
# import torch
# import torch.hub
# from utils.yolo_effent_models import load_efficientnet_model, load_yolov5_model

class PredictionappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.predictionapp'

    # def ready(self):
    #     device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    #     self.yolov5_model = load_yolov5_model(device)
    #     self.effnet_v2_s_model = load_efficientnet_model('../../pt_files/efficientent.pt', 38, device)
    #     print("Models loaded successfully at server startup")
