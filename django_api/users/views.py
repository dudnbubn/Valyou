import random
import string

from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView

from users.serializers import UserSerializer


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

        for _ in range(5):
            artist_email = ""
            for _ in range(random.randint(4, 12)):
                artist_email += random.choice(string_pool)
            artist_email += random.choice(email_pool)

            level = random.choice(level_pool)
            nickname = ""
            for _ in range(random.randint(4, 10)):
                nickname += random.choice(string_pool)
            gender = random.choice(gender_pool)
            revenue = random.randint(0, 10000)

            get_user_model().objects.create(email=artist_email,
                                    password="123456",
                                    nickname=nickname,
                                    gender=gender,
                                    artist_level=level,
                                    revenue=revenue
            )

        return queryset
