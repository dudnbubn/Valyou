# Generated by Django 3.2.8 on 2021-10-27 20:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artworks', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='artwork',
            name='id',
        ),
        migrations.AlterField(
            model_name='artwork',
            name='artist_email',
            field=models.CharField(max_length=40, primary_key=True, serialize=False),
        ),
    ]
