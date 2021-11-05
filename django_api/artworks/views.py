from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User
from .serializers import ArtworkSerializer, ArtworkMainSerializer
from .models import Artwork


# artworks/
class ArtworkViewSet(viewsets.ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer


# artworks/search
class ArtworkSearchViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    def get_queryset(self):

        level = self.request.query_params.get('level')
        query = self.request.query_params.get('query')

        queryset = Artwork.objects.filter(level=level, title__contains=query)

        return queryset


class ArtworkListViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkMainSerializer

    def get_queryset(self):

        level = self.request.query_params.get('level')
        category = self.request.query_params.get('category')
        order = self.request.query_params.get('order')
        queryset = Artwork.objects.filter(level=level, category=category)

        if order == 'popular':
            queryset = queryset.order_by('-like_count')

        return queryset


class ArtworkPopularViewSet(ListAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkMainSerializer

    def get_queryset(self):
        level = self.request.query_params.get('level')
        queryset = Artwork.objects.filter(level=level).order_by('-like_count')

        return queryset
