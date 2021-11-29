from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers

from .views import CommentListViewSet, ArtworkViewSet, CommentViewSet, RecentViewSet, CommentGetViewSet, \
    ArtworkByArtistViewSet, MyRecentViewSet
from .views import ArtworkSearchViewSet
from .views import ArtworkListViewSet
from .views import ArtworkPopularViewSet
from .views import ArtworkRecommendViewSet
from .views import ArtworkDataViewSet
from .views import InfoAPI

router = routers.DefaultRouter()
router.register(r'', ArtworkViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('search', ArtworkSearchViewSet.as_view()),
    path('list', ArtworkListViewSet.as_view()),
    path('popular', ArtworkPopularViewSet.as_view()),
    path('byartist', ArtworkByArtistViewSet.as_view()),
    path('recommend', ArtworkRecommendViewSet.as_view()),
    path('data', ArtworkDataViewSet.as_view()),
    path('info', InfoAPI.as_view()),
    path('comments', CommentViewSet.as_view({
        'get': 'list',
        'post': 'create',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    })),
    path('comments/list', CommentListViewSet.as_view()),
    path('comments/<artwork>/', CommentGetViewSet.as_view()),

    path('recent-view', RecentViewSet.as_view({
        'get': 'list',
        'post': 'create',
        'put': 'update',
        'patch': 'partial_update',
        'delete': 'destroy'
    })),
    path('my-recent', MyRecentViewSet.as_view()),
]
