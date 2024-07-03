from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.accountapp.views import change_password, delete_user, find_password, find_user, login, logout, signup

app_name = "accountapp"

urlpatterns = [
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('find/user/', find_user, name='find_user'),
    path('find/password/', find_password, name='find_password'),
    path('change/password/', change_password, name='change_password'),
    path('<int:user_pk>/', delete_user, name='delete_user'),
]
