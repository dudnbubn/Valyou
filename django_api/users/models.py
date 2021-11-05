from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager

GENDER_SELECTION = [
        ('M','Male'),
        ('F','Female'),
        ('NS', 'Not Specified'),
]

class CustomUser(AbstractUser):

    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


    user_name = models.CharField(max_length=100, null=True)
    nickname = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=11, null=True)
    birthday = models.DateField(null=True)
    artist_level = models.CharField(max_length=100, null=True)
    join_date = models.DateField(auto_now=True, null=True)
    revenue = models.IntegerField(default=0, null=True)
    gender = models.CharField(max_length=20, choices=GENDER_SELECTION, null=True)
    def __str__(self):
        return self.email