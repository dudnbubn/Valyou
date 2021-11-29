from django.db import models
from django.db.models.fields.related import ForeignKey
from django.contrib.auth import get_user_model

# Create your models here.
class Donation(models.Model):
    id = models.AutoField(primary_key=True)
    giver = ForeignKey(to=get_user_model(), related_name='giver')
    sender = ForeignKey(to=get_user_model(), related_name='sender')
    donation = models.IntegerField()

    def __str__(self):
        return str(self.id)