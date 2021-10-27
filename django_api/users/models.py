from django.db import models

# Create your models here.
class User(models.Model):
    email_addr = models.CharField(max_length=40, primary_key=True)
    pwd = models.CharField(max_length=40)
    nickname = models.CharField(max_length=40)
    birthday = models.CharField(max_length=10)

    def __str__(self):
        return self.email_addr