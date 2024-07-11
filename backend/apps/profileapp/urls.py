from django.urls import path

from apps.profileapp.views import article_sales_list, user_profile




app_name = "profileapp"

urlpatterns = [
    path('<int:user_pk>/', user_profile, name='user_profile'),
    path('<int:user_pk>/sales/list/', article_sales_list, name="article_sales_list"),
]