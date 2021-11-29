from django.db import models
from django.db.models.fields.related import ForeignKey
from django.contrib.auth import get_user_model

# Create your models here.
class Donation(models.Model):
    id = models.AutoField(primary_key=True)
    receiver = ForeignKey(to=get_user_model(), related_name='receiver', on_delete=models.PROTECT)
    sender = ForeignKey(to=get_user_model(), related_name='sender', on_delete=models.PROTECT)
    donation = models.IntegerField()
    donate_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.id)