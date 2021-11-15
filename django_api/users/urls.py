from django.urls import path, include
from .views import ArtistList, ArtistDetail, LoginAPI, SignupAPI, InfoAPI, UserViewSet
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', UserViewSet)

urlpatterns = [
    path("artists/", ArtistList.as_view()),
    path("artists/<pk>/", ArtistDetail.as_view()),
    path("login/", LoginAPI.as_view()),
    path("signup/", SignupAPI.as_view()),
    path("info/", InfoAPI.as_view()),
    path('token/', obtain_jwt_token),
    path('token/verify/', verify_jwt_token),
    path('token/refresh/', refresh_jwt_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)