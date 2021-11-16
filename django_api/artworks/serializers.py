from rest_framework import serializers

from .models import Artwork, RecentView, Comment
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


class ArtworkArtistLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['artist'] = UserSerializer(instance.artist).data['artist_level']
        return response


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ArtworkCommentSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Artwork
        fields = ('id', 'title', 'comments')
