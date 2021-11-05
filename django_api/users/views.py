from rest_framework import viewsets
from django_api.users.serializers import UserSerializer
from users.models import CustomUser

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
