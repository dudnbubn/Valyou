from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from .views import DonationViewSet

router = routers.DefaultRouter()
router.register(r'', DonationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
