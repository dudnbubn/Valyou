from django.contrib.auth import get_user_model
from django.db import transaction
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from .models import *
from artworks.models import RecentView

User = get_user_model()

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class RecentViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecentView
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    recent_view_list = RecentViewSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'
        # fields = ['id', 'email', 'artist_name', 'nickname', 'artist_level', 'date_joined', 'revenue', 'gender']


class CustomRegisterSerializer(RegisterSerializer):
    artist_name = serializers.CharField(max_length=30)
    nickname = serializers.CharField(max_length=30)
    gender = serializers.CharField(max_length=30)
    
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.artist_name = self.data.get('artist_name')
        user.nickname = self.data.get('nickname')
        user.gender = self.data.get('gender')
        user.save()
        return user