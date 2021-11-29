from django.db import models
from django.db.models.fields.related import ForeignKey
from django.contrib.auth import get_user_model

# Create your models here.
class Donation(models.Model):
    id = models.AutoField(primary_key=True)
    giver = ForeignKey(to=get_user_model(), related_name='giver', on_delete=models.PROTECT)
    sender = ForeignKey(to=get_user_model(), related_name='sender', on_delete=models.PROTECT)
    donation = models.IntegerField()

    def __str__(self):
        return str(self.id)