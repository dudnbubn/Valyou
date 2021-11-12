from rest_framework import routers
from .views import HelloAPI, RegistrationAPI, LoginAPI, UserAPI
from django.urls import path, include
from users import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("artists/", views.ArtistList.as_view()),
    path("artists/<pk>/", views.ArtistDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)