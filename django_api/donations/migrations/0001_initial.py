# Generated by Django 3.2.7 on 2021-11-29 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('donation', models.IntegerField()),
                ('donate_date', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
