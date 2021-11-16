from django.contrib import admin
from .models import Artwork, RecentView, Comment
# Register your models here.
admin.site.register(Artwork)
admin.site.register(RecentView)
admin.site.register(Comment)