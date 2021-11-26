from rest_framework import serializers

from .models import Artwork, RecentView, Comment, File, Image
from users.serializers import UserSerializer


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ArtworkSerializer(serializers.ModelSerializer):
    files = FileSerializer(many=True)
    images = ImageSerializer(many=True)

    class Meta:
        model = Artwork
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)

        file_category = validated_data['file_category']
        files_data = validated_data.pop('file')

        artwork = Artwork.objects.create(**validated_data)
        if file_category == "image":
            for file_data in files_data:
                Image.objects.create(artwork=artwork, **file_data)
        else:
            for file_data in files_data:
                File.objects.create(artwork=artwork, **file_data)

        return artwork

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['artist'] = UserSerializer(instance.artist).data
        return response


class ArtworkPopularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        exclude = ('hashtag',)

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['artist'] = UserSerializer(instance.artist).data
        return response


class ArtworkArtistLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['artist'] = UserSerializer(instance.artist).data['artist_level']
        return response


class RecentViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecentView
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class CommentIncludeNicknameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data['nickname']
        return response


class ArtworkCommentSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Artwork
        fields = ('id', 'title', 'comments')
