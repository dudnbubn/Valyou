from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers

from .views import ArtworkViewSet
from .views import ArtworkSearchViewSet
from .views import ArtworkListViewSet

router = routers.DefaultRouter()
router.register('',ArtworkViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('search', ArtworkSearchViewSet.as_view()),
    path('list', ArtworkListViewSet.as_view()),
]
