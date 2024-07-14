from django.urls import path
from apps.predictionapp.views import image_classifier_model

app_name = "predictionapp"

urlpatterns = [
    path('ai/', image_classifier_model, name='image_classifier_model'),
]