# # from typing_extensions import Required
# from rest_framework import serializers
# # from .models import User, RecentView, MyArtwork
# from django.contrib.auth import get_user_model, authenticate
# from django.contrib.auth.models import update_last_login
# from rest_framework_jwt.settings import api_settings

# User = get_user_model()

# JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
# JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

# # class RecentViewSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = RecentView
# #         fields = '__all__'

# # class MyArtworkSerailizer(serializers.ModelSerializer):
# #     class Meta:
# #         model = MyArtwork
# #         fields = '__all__'

# class UserLoginSerializer(serializers.Serializer):
#     email = serializers.CharField(max_length=64)
#     password = serializers.CharField(max_length=128, write_only=True)
#     token = serializers.CharField(max_length=255, read_only=True)

#     def validate(self, data):
#         email = data.get("email", None)
#         password = data.get("password", None)
#         user = authenticate(email=email, password=password)

#         if user is None:
#             return {
#                 'email':'None'
#             }
#         try:
#             payload = JWT_PAYLOAD_HANDLER(user)
#             jwt_token = JWT_ENCODE_HANDLER(payload)
#             update_last_login(None, user)
#         except User.DoesNotExist:
#             raise serializers.ValidationError(
#                 'User with given email and password does not exists'
#             )
#         return {
#             'email': user.email,
#             'token': jwt_token
#         }

# class UserCreateSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=True)
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(required=True)
#     print(email)
#     def create(self, validated_date):
#         user = User.objects.create(
#             email=validated_date['email'],
#             username=validated_date['username'],
#         )
#         user.set_password(validated_date['password'])

#         user.save()
#         return user

# # class UserSerializer(serializers.ModelSerializer):
# #     rv_user_id = RecentViewSerializer(many=True, read_only=True)
# #     ma_artwork_id = MyArtworkSerailizer(many=True, read_only=True)
# #     class Meta:
# #         model = User
# #         fields = ('email_addr', 'pwd', 'nickname', 'user_name', 'phone_number', 'birthday', 'artist_level', 'join_date', 'revenue', 'rv_user_id', 'ma_artwork_id')



