from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers

from .views import ArtworkViewSet
from .views import ArtworkSearchViewSet
from .views import ArtworkListViewSet
from .views import ArtworkPopularViewSet
from .views import ArtworkRecommendViewSet
from .views import ArtworkDataViewSet

router = routers.DefaultRouter()
router.register('',ArtworkViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('search', ArtworkSearchViewSet.as_view()),
    path('list', ArtworkListViewSet.as_view()),
    path('popular', ArtworkPopularViewSet.as_view()),
    path('recommend', ArtworkRecommendViewSet.as_view()),
    path('data', ArtworkDataViewSet.as_view()),
]
