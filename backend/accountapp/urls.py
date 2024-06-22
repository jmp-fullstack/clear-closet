from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accountapp.views import change_password, delete_user, find_password, find_user, login, logout, signup

app_name = "accountapp"

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', login, name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('logout/', logout, name='logout'),
    path('auth/user/', find_user, name='auth_user'),
    path('auth/password/', find_password, name='auth_password'),
    path('change/password/', change_password, name='change_password'),
    path('delete/<int:user_pk>/', delete_user, name='delete_user'),
]
