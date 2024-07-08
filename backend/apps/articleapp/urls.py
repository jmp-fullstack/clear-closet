from django.urls import path

from apps.articleapp.views import article_create, article_delete, article_detail, article_list, article_modify


app_name = "articleapp"

urlpatterns = [
    path('list/', article_list, name="article_list"),
    path('', article_create, name="article_create"),
    path('detail/<int:article_pk>', article_detail, name="article_detail"),
    path('modify/<int:article_pk>', article_modify, name="article_modify"),
    path('delete/<int:article_pk>', article_delete, name="article_delete"),
]
