from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ArtworkSerializer
from .models import Artwork

# Create your views here.
class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer