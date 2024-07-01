from django.urls import path

from apps.favoriteapp.views import favorite_article, list_favorites

urlpatterns = [
    path('<int:article_id>/', favorite_article, name='favorite-article'),
    path('', list_favorites, name='list-favorites'),
]