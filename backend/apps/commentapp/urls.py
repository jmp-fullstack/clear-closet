from django.urls import path

from apps.commentapp.views import create_comment, delete_comment, fetch_comment, list_comments


urlpatterns = [
    path('<int:article_pk>/', list_comments, name='list-comments'),
    path('create/<int:article_pk>/', create_comment, name='create-comment'),
    path('delete/<int:article_pk>/<int:comment_pk>', delete_comment, name='delete-comment'),
    path('modify/<int:article_pk>/<int:comment_pk>', fetch_comment, name='fetch-comment'),
]