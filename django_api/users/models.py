from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager

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
    nickname = models.CharField(max_length=30)
    gender = models.CharField(choices=GENDER, default="NS", max_length=30)
    artist_level = models.CharField(choices=LEVEL, default="nov", max_length=30)
    revenue = models.IntegerField(default=0)

    artist_img = models.ImageField(default='default.jpeg')

    def __str__(self):
        return self.email


class FavoriteArtist(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(to=CustomUser, related_name='favorite_artist_list', on_delete=models.CASCADE)
    artist = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)