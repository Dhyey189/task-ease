from django.db import models
from tasks.models import Task
# Create your models here.

class Status(models.Model):
    class Meta:
        db_table = 'statuses'
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class TaskStatus(models.Model):
    class Meta: 
        db_table = 'TaskStatuses'

    task = models.ForeignKey(Task,on_delete=models.CASCADE)
    status = models.ForeignKey(Status,on_delete=models.CASCADE)
    is_current = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
