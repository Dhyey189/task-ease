# Generated by Django 4.1.6 on 2023-03-19 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0009_alter_task_scheduled_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='scheduled_at',
            field=models.DateTimeField(),
        ),
    ]
