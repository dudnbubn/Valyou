from django.db import models

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

class Artist(models.Model):
    artist_name = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    nickname = models.CharField(max_length=20, primary_key=True)
    email = models.EmailField(max_length=30)
    gender = models.CharField(choices=GENDER, default="NS", max_length=10)
    artist_level = models.CharField(choices=LEVEL, default="nov", max_length=10)
    join_date = models.DateField(auto_now=True)
    revenue = models.IntegerField(default=0)

    def __str__(self):
        return self.nickname
    