from django.urls import path

from apps.favoriteapp.views import favorite_article, list_favorites, list_top_favorited_articles

urlpatterns = [
    path('<int:article_id>/', favorite_article, name='favorite-article'),
    path('list/', list_favorites, name='list-favorites'),
    path('articles/list/', list_top_favorited_articles, name='list-top-favorited-articles'),
]