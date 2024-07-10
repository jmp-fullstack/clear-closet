import torch
import torch.nn as nn
from torchvision import models as get_model
import torch.hub

def load_yolov5_model(model_path, device):
    model = torch.hub.load('ultralytics/yolov5', 'custom', path=model_path)
    model.to(device)
    model.eval()
    return model

def load_efficientnet_model(model_path, num_classes, device):
    model = get_model.efficientnet_v2_s(pretrained=False)
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(in_features, num_classes)
    checkpoint = torch.load(model_path, map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model.to(device)
    model.eval()
    return model