from django.urls import path
from .views import SignUpView, LoginView, SendCodeView, LogoutView, MeView

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("send-code/", SendCodeView.as_view(), name="send_code"),
    path("me/", MeView.as_view(), name="me"),
    path("logout/", LogoutView.as_view(), name="auth_logout"),
]
