import random
import string

from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.generics import ListAPIView

from artworks.models import FavoriteArtist
from artworks.serializers import ArtworkSerializer
from users.serializers import UserSerializer, FavoriteArtistSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class ArtistViewSet(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        nickname = self.request.query_params.get('nickname')
        queryset = get_user_model().objects.filter(nickname=nickname)

        return queryset


class UserDataViewSet(ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    flag = 0

    def get_queryset(self):
        queryset = get_user_model().objects.all()

        if self.flag == 1:
            self.flag = 0
            return queryset

        self.flag = 1

        string_pool = string.ascii_letters + string.digits
        email_pool = ['@gmail.com', '@naver.com', '@daum.net']
        level_pool = ['pro', 'adv', 'nov']
        gender_pool = ["NS", "M", "F"]
        adj_pool = ['가난한', '부유한', '화난', '우울한', '즐거운', '기발한', '진부한', '초라한', '화려한', '아름다운', '우수한', '불쾌한', '유쾌한', '활발한', '얌전한', '잠재력있는', '아픈', '건강한', '멋있는', '잔인한', '인자한', '강인한', '민첩한', '섹시한']
        job_pool = ['화가', '작가', '작곡가', '가수', '개발자', '경찰', '의사', '건축가', '운동선수', '디자이너', '요리사', '학생', '교사', '바리스타', '바텐더', '어린이', '노인']
        for _ in range(5):
            artist_email = ""
            for _ in range(random.randint(4, 12)):
                artist_email += random.choice(string_pool)
            artist_email += random.choice(email_pool)

            level = random.choice(level_pool)
            nickname = random.choice(adj_pool) + ' ' + random.choice(job_pool)
            gender = random.choice(gender_pool)
            revenue = random.randint(0, 10000)

            get_user_model().objects.create(
                                        email=artist_email,
                                        password="123456",
                                        nickname=nickname,
                                        gender=gender,
                                        artist_level=level,
                                        revenue=revenue
                                    )

        return queryset
