from rest_framework import routers
from .views import UserViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register('user2', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]