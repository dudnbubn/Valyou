from django.db import models


# Create your models here.
class Artwork(models.Model):
    id = models.AutoField(primary_key=True)
    artist_email = models.EmailField(max_length=40)
    category = models.CharField(max_length=10)
    title = models.CharField(max_length=60)
    contents = models.CharField(max_length=1000)
    description = models.CharField(max_length=200)
    like_count = models.IntegerField(default=0, null=False)
    view_count = models.IntegerField(default=0, null=False)
    upload_date = models.DateField(auto_now=True)
    file_img = models.ImageField(default='default_image.jpeg')
    file_name = models.CharField(max_length=1000)

    level = models.CharField(max_length=10, default='pro')
    artist_nickname = models.CharField(max_length=60, default='abcd')
    hashtag = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.artist_email)
