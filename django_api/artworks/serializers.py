from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Artwork, RecentView
from users.serializers import UserSerializer


class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['artist'] = UserSerializer(instance.artist).data
        return response


class ArtworkMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = ('id', 'category', 'title', 'artist_nickname', 'like_count', 'file_img', 'hashtag')
