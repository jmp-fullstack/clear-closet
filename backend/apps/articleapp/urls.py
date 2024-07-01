from django.urls import path

from apps.articleapp.views import article_create, article_delete, article_detail, article_list, article_update


app_name = "articleapp"

urlpatterns = [
    path('', article_create, name="article_create"),
    path('list/', article_list, name="article_list"),
    path('<int:article_pk>', article_detail, name="article_detail"),
    path('delete/<int:article_pk>', article_delete, name="article_remove"),
    path('update/<int:article_pk>', article_update, name="article_remove"),
]
