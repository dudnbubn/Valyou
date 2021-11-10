# """django_api URL Configuration

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/3.2/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
# from django.contrib import admin
# from django.urls import path
# from django.conf.urls import url, include
# from django.conf import settings
# from django.conf.urls.static import static
# from rest_framework import routers
# from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # path('users/', include('users.urls')),
#     # path('artworks/', include('artworks.urls')),
#     # url(r'^api-jwt-auth/$', obtain_jwt_token),
#     # url(r'^api-jwt-auth/refresh/$', refresh_jwt_token),
#     # url(r'^api-jwt-auth/verify/$', verify_jwt_token),

from allauth.account.views import confirm_email
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('users/', include('users.urls')),
    path('artworks/', include('artworks.urls')),
    url(r'^account/', include('allauth.urls')),
    url(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),

]