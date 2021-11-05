# from django.contrib import admin
# from django.urls import path
# from django.conf.urls import url, include
# from rest_framework import routers, views
# from . import views
# from .views import UserViewSet

# router = routers.DefaultRouter()
# router.register('', UserViewSet)

# urlpatterns = [
    # url(r'^', include(router.urls)),
    # path('login', views.login),
    # path('signup', views.signup),
# ]

from rest_framework import routers
from users.views import UserViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register('user', UserViewSet)

urlpatters = [
    path('', include(router.urls)),
]