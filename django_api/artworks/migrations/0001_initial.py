# Generated by Django 3.2.7 on 2021-11-29 13:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artwork',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=10)),
                ('title', models.CharField(max_length=60)),
                ('contents', models.CharField(max_length=1000)),
                ('description', models.CharField(max_length=200)),
                ('like_count', models.IntegerField(default=0)),
                ('view_count', models.IntegerField(default=0)),
                ('upload_date', models.DateField(auto_now=True)),
                ('hashtag', models.CharField(max_length=1000)),
                ('rating', models.IntegerField(default=0)),
                ('rating_count', models.IntegerField(default=0)),
                ('file_category', models.CharField(max_length=100)),
                ('thumbnail_img', models.ImageField(default='default_image.jpeg', upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('comment', models.CharField(max_length=500)),
                ('like', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('upload_file', models.FileField(upload_to='', verbose_name='default.epub')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('upload_file', models.ImageField(upload_to='', verbose_name='default_image.jpeg')),
            ],
        ),
        migrations.CreateModel(
            name='RecentView',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('recent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='artworks.artwork')),
            ],
        ),
    ]
