from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from users.models import Artist
from users.serializers import ArtistSerializer
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from . import models
from rest_framework import viewsets

from django.shortcuts import render
from rest_framework import status, mixins
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
from .serializers import *
from .models import *

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class ArtistList(generics.ListCreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        Token.objects.create(user=request)
        return self.create(request, *args, **kwargs)

class ArtistDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class SignupAPI(APIView):
    def post(self, request):
        user = User.objects.create_user(username=request.data['id'], password=request.data['password'])
        profile = models.Profile(user=user, nickname=request.data['nickname'])

        user.save()
        profile.save()

        token = Token.objects.create(user=user)
        return Response({"Token":token.key})


class SignupAPI(generics.GenericAPIView):
    permission_classes = (AllowAny, )
    serializer_class = CustomRegisterSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginAPI(generics.GenericAPIView):
    permission_classes = (AllowAny, )
    serializer_class = UserLoginSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        if user['email'] == "None":
            return Response({"message": "fail"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(
            {
                 "email": UserLoginSerializer(
                     user,context=self.get_serializer_context()
                 ).data.get('email'), 
                 "token": user['token']
             }
        ) 

class InfoAPI(generics.GenericAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(1)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message":"Request Body Error."}, status=status.HTTP_409_CONFLICT)
        print(2)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        print(3)
        if user['email'] == "None":
            return Response({"message": "fail"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(
            {
                 "email": UserSerializer(
                     user,context=self.get_serializer_context()
                 ).data.get('email'), 
                 "token": user['token']
             }
        )
    
