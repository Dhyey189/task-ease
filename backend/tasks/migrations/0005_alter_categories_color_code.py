# Generated by Django 4.1.6 on 2023-03-01 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0004_alter_categories_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='color_code',
            field=models.CharField(default='#ffffff', max_length=7),
        ),
    ]
