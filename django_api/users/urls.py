from django.urls import path, include

from users.views import UserDataViewSet

urlpatterns = [
    path('data', UserDataViewSet.as_view()),
]