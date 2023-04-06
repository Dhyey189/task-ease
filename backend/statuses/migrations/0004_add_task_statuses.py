# Generated by Django 4.1.6 on 2023-02-28 10:24
from django.db import migrations
from statuses.models import Status

def add_statuses(apps, schema_editor):
    statuses_list = []
    "created", "completed" , "incomplete", "archived", "deleted"
    statuses_list.append(Status(name="open",description="Task is opened, working on task is yet to start"))
    statuses_list.append(Status(name="inprogress",description="Working on task started!"))
    statuses_list.append(Status(name="accomplished",description="Task completed successfully!"))
    statuses_list.append(Status(name="missed",description="Task has crossed its dead line!"))
    statuses_list.append(Status(name="archive",description="Task soft deleted at some point!"))
    Status.objects.bulk_create(statuses_list)

class Migration(migrations.Migration):

    dependencies = [
        ('statuses', '0003_alter_status_table'),
    ]

    operations = [
        migrations.RunPython(add_statuses)
    ]
