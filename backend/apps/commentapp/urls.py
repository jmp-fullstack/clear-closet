from django.urls import path

from apps.commentapp.views import create_comment, list_comments


urlpatterns = [
    path('<int:article_id>/', list_comments, name='list-comments'),
    path('create/<int:article_id>/', create_comment, name='create-comment'),
]