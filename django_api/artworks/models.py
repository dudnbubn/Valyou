from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Artwork(models.Model):
    id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=10)
    title = models.CharField(max_length=60)
    contents = models.CharField(max_length=1000)
    description = models.CharField(max_length=200)
    like_count = models.IntegerField(default=0, null=False)
    view_count = models.IntegerField(default=0, null=False)
    upload_date = models.DateField(auto_now=True)
    hashtag = models.CharField(max_length=1000)

    rating = models.IntegerField(default=0, null=False)
    rating_count = models.IntegerField(default=0, null=False)
    file_category = models.CharField(max_length=100)
    thumbnail_img = models.ImageField(default='default_image.jpeg')

    artist = models.ForeignKey(to=get_user_model(), related_name='artist', on_delete=models.CASCADE)
    favorite_artist = models.ForeignKey(to=get_user_model(), related_name='favorite_artist', on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.id)


class RecentView(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(to=get_user_model(), related_name='recent_view_list', on_delete=models.CASCADE)
    recent = models.ForeignKey(to=Artwork, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(to=get_user_model(), on_delete=models.CASCADE)
    artwork = models.ForeignKey(to=Artwork, related_name='comments', on_delete=models.CASCADE)
    comment = models.CharField(max_length=500)
    like = models.IntegerField(default=0)
    
    def __str__(self):
        return str(self.id)


class File(models.Model):
    id = models.AutoField(primary_key=True)
    artwork = models.ForeignKey(to=Artwork, related_name='files', on_delete=models.CASCADE)
    upload_file = models.FileField('default.epub')


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    artwork = models.ForeignKey(to=Artwork, related_name='images', on_delete=models.CASCADE)
    upload_file = models.ImageField('default_image.jpeg')


class FavoriteArtwork(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(to=get_user_model(), related_name='favorite_artworks', on_delete=models.CASCADE)
    artwork = models.ForeignKey(to=Artwork, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)