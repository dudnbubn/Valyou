from django.contrib import admin
from .models import Artwork, RecentView, Comment, File, Image

# Register your models here.
admin.site.register(Artwork)
admin.site.register(RecentView)
admin.site.register(Comment)
admin.site.register(File)
admin.site.register(Image)
