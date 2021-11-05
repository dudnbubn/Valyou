# from django.shortcuts import render
# from rest_framework import viewsets
# from .serializers import UserSerializer
# from .models import User

# from django.core import cache
# from rest_framework.response import Response
# from rest_framework import status, mixins
# from rest_framework import generics
# from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
# from rest_framework.decorators import permission_classes, authentication_classes, api_view

# from rest_framework_jwt.authentication import JSONWebTokenAuthentication
# from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

# from .serializers import *
# from .models import *

# # Create your views here.
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request):
#     if request.method == 'POST':
#         serializer = UserLoginSerializer(data=request.data)

#         if not serializer.is_valid(raise_exception=True):
#             return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
#         if serializer.validated_data['email'] == "None":
#             return Response({'message': 'fail'}, status=status.HTTP_200_OK)

#         response = {
#             'success': True,
#             'token': serializer.data['token']
#         }
#         return Response(response, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def signup(request):
#     serializer = UserCreateSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data, status=201)

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer