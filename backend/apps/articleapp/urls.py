from django.urls import path

from apps.articleapp.views import article_create, article_detail, article_list


app_name = "articleapp"

urlpatterns = [
    path('list/', article_list, name="article_list"),
    path('', article_create, name="article_create"),
    path('<int:article_pk>', article_detail, name="article_detail"),
    path('<int:article_pk>', article_detail, name="article_remove"),
    path('<int:article_pk>', article_detail, name="article_remove"),
]
