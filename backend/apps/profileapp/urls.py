from django.urls import path

from apps.profileapp.views import article_sales_list, update_profile_image, user_profile


app_name = "profileapp"

urlpatterns = [
    path('<int:user_pk>/', user_profile, name='user_profile'),
    path('<int:user_id>/sales/list', article_sales_list, name="article_sales_list"),
    path('profile-image/<int:user_id>', update_profile_image, name='update_profile_image'),
]