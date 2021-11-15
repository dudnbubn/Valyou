from rest_framework import serializers
from users.models import Artist

from rest_framework_jwt.settings import api_settings
from django.contrib.auth import get_user, get_user_model
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
from rest_auth.registration.serializers import RegisterSerializer
from .models import *
from django.db import transaction

User = get_user_model()

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'artist_name', 'nickname', 'artist_level', 'date_joined', 'revenue', 'gender']

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

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)

        if user is None:
            return {
                'email': 'None'
            }
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        return {
            'email': user.email,
            'token': jwt_token
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("__all__")

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = "__all__"

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ("email", "password")
