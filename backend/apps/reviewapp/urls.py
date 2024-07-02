from django.urls import path

from apps.reviewapp.views import create_review, list_reviews

urlpatterns = [
    path('', list_reviews, name='list-reviews'),
    path('<int:article_id>/', create_review, name='create-review'),
]