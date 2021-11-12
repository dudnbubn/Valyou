from django.db.models.enums import Choices
from rest_framework import serializers
from .models import CustomUser
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.db import transaction

from .models import GENDER_SELECTION

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_name', 'nickname', 'artist_level', 'join_date', 'revenue', 'gender']

class CustomRegisterSerializer(RegisterSerializer):
    email = serializers.EmailField()
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    user_name = serializers.CharField(max_length=100)
    nickname = serializers.CharField(max_length=100)
    gender = serializers.ChoiceField(choices=GENDER_SELECTION)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.email = self.data.get('email')
        user.password1 = self.data.get('password1')
        user.password2 = self.data.get('password2')
        user.user_name = self.data.get('user_name')
        user.nickname = self.data.get('nickname')
        user.gender = self.data.get('gender')
        user.save()
        return user
        