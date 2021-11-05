from django.db import models

# Create your models here.
class Artwork(models.Model):
    id = models.AutoField(primary_key=True)
    artist_email = models.EmailField(max_length=40)
    category = models.CharField(max_length=4)
    title = models.CharField(max_length=60)
    contents = models.CharField(max_length=1000)
    description = models.CharField(max_length=200)
    like_count = models.IntegerField(default=0, null=True)
    view_count = models.IntegerField(default=0, null=True)
    upload_date = models.DateField(auto_now=True)
    file_img = models.CharField(default="../img/img_v.png", max_length=1000)
    file_name = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.id)