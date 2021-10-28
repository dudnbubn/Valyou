from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers, views
from users.views import UserViewSet

router = routers.DefaultRouter()
router.register('users',UserViewSet)


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include(router.urls)),
]