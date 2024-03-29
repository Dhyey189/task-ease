# Generated by Django 4.1.6 on 2023-03-20 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0010_alter_task_scheduled_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='completed_at',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='is_sent_remainder_12_hour',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='task',
            name='is_sent_remainder_4_hour',
            field=models.BooleanField(default=False),
        ),
    ]
