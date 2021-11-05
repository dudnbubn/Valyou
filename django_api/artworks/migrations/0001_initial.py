# Generated by Django 3.2.8 on 2021-11-01 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Artwork',
            fields=[
                ('artist_email', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=4)),
                ('title', models.CharField(max_length=60)),
                ('contents', models.CharField(max_length=1000)),
                ('description', models.CharField(max_length=200)),
                ('like_count', models.IntegerField(default=0, null=True)),
                ('view_count', models.IntegerField(default=0, null=True)),
                ('upload_date', models.DateField(auto_now=True)),
                ('file_img', models.CharField(default='../img/img_v.png', max_length=1000)),
                ('file_name', models.CharField(max_length=1000)),
            ],
        ),
    ]
