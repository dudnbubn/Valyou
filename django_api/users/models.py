from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from users.managers import CustomUserManager

LEVEL = [
    ("pro", "Professional"),
    ("adv", "Advanced"),
    ("nov", "Novice")
]

GENDER = [
    ("NS", "Not Selected"),
    ("M", "Male"),
    ("F", "Female")
]


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    artist_name = models.CharField(max_length=30)
    nickname = models.CharField(max_length=20)
    gender = models.CharField(choices=GENDER, default="NS", max_length=10)
    artist_level = models.CharField(choices=LEVEL, default="nov", max_length=10)
    revenue = models.IntegerField(default=0)

    def __str__(self):
        return self.email
