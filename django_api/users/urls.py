from django.urls import path, include
from rest_framework import routers

from users.views import UserViewSet, UserDataViewSet, ArtistViewSet

router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('artist', ArtistViewSet.as_view()),
    path('data', UserDataViewSet.as_view()),
]