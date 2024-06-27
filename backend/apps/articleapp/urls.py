from django.urls import path

from apps.articleapp.views import article_detail, article_list


app_name = "articleapp"

urlpatterns = [
    path('list/', article_list, name="article_list"),
    path('', article_detail, name="article_detail")
]
