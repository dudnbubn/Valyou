from django.contrib.auth import get_user_model
from django.shortcuts import render
from requests import Response
from rest_framework import viewsets, status
from rest_framework.generics import ListAPIView
from .models import Donation
from .serializers import DonationSerializer
from django.db.models import Q

# Create your views here.
class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def create(self, request):
        data = request.data.dict()
        sender = get_user_model().objects.get(id=data['sender'])
        receiver = get_user_model().objects.get(nickname=data['receiver'])
        money = data['price']
        sender_revenue = int(sender.revenue) - int(money)
        receiver_revenue = int(receiver.revenue) + int(money)

        get_user_model().objects.all().filter(id=data['sender']).update(revenue=sender_revenue)
        get_user_model().objects.all().filter(nickname=data['receiver']).update(revenue=receiver_revenue)
        Donation.objects.create(receiver=get_user_model().objects.get(nickname=data['receiver']),
                                         sender=get_user_model().objects.get(id=data['sender']),
                                         donation=money)

        headers = self.get_success_headers(DonationSerializer.data)
        return Response(DonationSerializer.data, status=status.HTTP_201_CREATED, headers=headers)


class DonateDetailViewSet(ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def get_queryset(self):
        receiver = self.request.GET.get('receiver')
        sender = self.request.GET.get('sender')
        
        queryset = Donation.objects.filter(Q(receiver=receiver) & Q(sender=sender)).order_by('-donate_date')
        return queryset