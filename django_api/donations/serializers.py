from django.db import models
from rest_framework import serializers
from .models import Donation
from users.serializers import UserSerializer


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'


class DonationWithUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['sender'] = UserSerializer(instance.sender).data
        response['receiver'] = UserSerializer(instance.receiver).data
        return response
