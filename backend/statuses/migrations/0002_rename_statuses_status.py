# Generated by Django 4.1.6 on 2023-02-28 10:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('statuses', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Statuses',
            new_name='Status',
        ),
    ]
