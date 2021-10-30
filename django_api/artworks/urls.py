from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers, views
from .views import ArtworkViewSet

router = routers.DefaultRouter()
router.register('',ArtworkViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
