from rest_framework import serializers
from .models import Artwork


class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'


class ArtworkMainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = ('id', 'category', 'title', 'artist_nickname', 'like_count', 'file_img', 'hashtag')

