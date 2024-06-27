from django.urls import path

from apps.articleapp.views import article_list


app_name = "articleapp"

urlpatterns = [
    path('list/', article_list, name="article_list"),
]
