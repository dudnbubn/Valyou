from django.db.models.enums import Choices
from rest_framework import serializers
from users.models import CustomUser
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.db import transaction

from users.models import GENDER_SELECTION

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'user_name', 'nickname', 'birthday', 'phone_number','artist_level', 'join_date', 'revenue', 'gender']

class CustomRegisterSerializer(RegisterSerializer):
    user_name = serializers.CharField(max_length=100)
    nickname = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=11)
    birthday = serializers.DateField()
    gender = serializers.ChoiceField(choices=GENDER_SELECTION)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.nickname = self.data.get('nickname')
        user.phone_number = self.data.get('phone_number')
        user.birthday = self.data.get('birthday')
        user.gender = self.data.get('gender')
        user.save()
        return user
        