# Generated by Django 3.2.8 on 2021-10-28 03:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artworks', '0007_alter_artwork_file_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artwork',
            name='file_img',
            field=models.CharField(default='../media/img_v.png', max_length=1000),
        ),
    ]
