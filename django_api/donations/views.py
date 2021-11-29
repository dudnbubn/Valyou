from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from .models import Donation
from .serializers import DonationSerializer
from django.db.models import Q

# Create your views here.
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer


class DonateDetailVeiwSet(ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def get_queryset(self):
        receiver = self.request.GET.get('receiver')
        sender = self.request.GET.get('sender')
        
        queryset = Donation.objects.filter(Q(receiver=receiver) & Q(sender=sender)).order_by('-donate_date')
        return queryset