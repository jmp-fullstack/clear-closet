from django.urls import path

from apps.imageapp.views import product_upload_images, user_upload_image

app_name = "imageapp"

urlpatterns = [
    path('upload/profile/', user_upload_image, name='upload-profile'),
    path('upload/product/', product_upload_images, name='upload-product'),
]