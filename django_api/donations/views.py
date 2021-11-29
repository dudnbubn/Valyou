from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from .models import Donation
from serializers import DonationSerializer

# Create your views here.
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
