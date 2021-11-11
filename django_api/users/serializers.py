from rest_framework import serializers
from users.models import Artist

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = "__all__"
