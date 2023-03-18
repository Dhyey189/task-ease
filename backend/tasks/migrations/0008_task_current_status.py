# Generated by Django 4.1.6 on 2023-03-15 02:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('statuses', '0005_taskstatus'),
        ('tasks', '0007_alter_categories_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='current_status',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, to='statuses.status'),
        ),
    ]
