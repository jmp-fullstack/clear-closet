from django.urls import path

from apps.profileapp.views import article_sales_list, get_user_profile, update_user_profile




app_name = "profileapp"

urlpatterns = [
    path('<int:user_pk>/', get_user_profile, name='get-user-profile'),
    path('modify/<int:user_pk>/', update_user_profile, name='update-user-profile'),
    path('<int:user_pk>/sales/list/', article_sales_list, name="article_sales_list"),
]