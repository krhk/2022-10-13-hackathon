# Generated by Django 4.1.2 on 2022-10-12 16:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transports', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='iredotrainstop',
            name='objectid',
        ),
        migrations.AlterField(
            model_name='iredobusstop',
            name='kod_orp',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='iredotrainstop',
            name='kod_orp',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
