from django.apps import AppConfig

from load_ai_models.models_load import initialize_models

class PredictionappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.predictionapp'

    def ready(self):
        initialize_models()
