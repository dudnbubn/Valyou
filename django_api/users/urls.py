from rest_framework import routers
from django.urls import path, include
from .views import LoginAPI, SignupAPI, InfoAPI
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

urlpatterns = [
    path("login/", LoginAPI.as_view()),
    path("signup/", SignupAPI.as_view()),
    path("info/", InfoAPI.as_view()),
    path('token/', obtain_jwt_token),
    path('token/verify/', verify_jwt_token),
    path('token/refresh/', refresh_jwt_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)