from django.urls import path
from .views import SignUpView, LoginView, SendCodeView

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("send-code/", SendCodeView.as_view(), name="send_code"),
]
