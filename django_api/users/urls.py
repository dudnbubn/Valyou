from django.urls import path, include
from rest_framework import routers

from users.views import UserViewSet, UserDataViewSet, ArtistViewSet, FavoriteArtistViewSet, MyFavoriteArtistViewSet

router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('artist', ArtistViewSet.as_view()),
    path('data', UserDataViewSet.as_view()),
    path('favorite-artist', FavoriteArtistViewSet.as_view({
        'get': 'list',
        'post': 'create',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    })),
    path('my-favorite-artist', MyFavoriteArtistViewSet.as_view()),
]