from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accountapp.views import change_password, delete_user, find_passwrod, find_user, logout, signup

app_name = "accountapp"

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout, name='logout'),
    path('find/user/', find_user, name='find_user'),
    path('find/password/', find_passwrod, name='find_passwrod'),
    path('change/password/', change_password, name='change_password'),
    path('/', delete_user, name='delete_user'),
]
