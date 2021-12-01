from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from .models import Donation
from .serializers import DonationSerializer, DonationWithUserSerializer
from django.db.models import Q

# Create your views here.wnr
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def create(self, request):
        data = request.data
        sender = get_user_model().objects.get(id=data['sender'])
        receiver = get_user_model().objects.get(nickname=data['receiver'])
        money = data['price']
        sender_revenue = int(sender.revenue) - int(money)
        receiver_revenue = int(receiver.revenue) + int(money)

        get_user_model().objects.all().filter(id=data['sender']).update(revenue=sender_revenue)
        get_user_model().objects.all().filter(nickname=data['receiver']).update(revenue=receiver_revenue)
        donate = Donation.objects.create(receiver=get_user_model().objects.get(nickname=data['receiver']),
                                         sender=get_user_model().objects.get(id=data['sender']),
                                         donation=money)

        headers = self.get_success_headers(DonationSerializer(donate).data)
        return Response(DonationSerializer(donate).data, status=status.HTTP_201_CREATED, headers=headers)


class DonateDetailViewSet(ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationWithUserSerializer

    def get_queryset(self):
        receiver = self.request.GET.get('receiver')
        sender = self.request.GET.get('sender')

        if receiver:
            return Donation.objects.filter(receiver=receiver).order_by('-donate_date')
        else:
            return Donation.objects.filter(sender=sender).order_by('-donate_date')
