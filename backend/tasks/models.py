from django.db import models
from datetime import datetime,timedelta
from accounts.models import User 
from django.utils.timezone import timezone
# Create your models here.




class Categories(models.Model):
    # name of category is unique case insensitive
    name = models.CharField(max_length=50,unique = True, default = "work")
    description = models.CharField(max_length=255, default = "All tasks related to work, like sending emails, scheduling meetings with clients etc.")
    user = models.ForeignKey(User,null=True,on_delete=models.SET_NULL)
    color_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

class Task(models.Model):
    class TaskTypeChoices(models.TextChoices):
        ONETIME = "onetime"
        RECURRING = "recurring"

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.ForeignKey(Categories,null=True,on_delete=models.SET_NULL)
    priority = models.IntegerField(default=1)
    # default scheduled for 10 min later than current.
    scheduled_at = models.DateTimeField(auto_now = True)
    task_type = models.CharField(max_length=50,choices=TaskTypeChoices.choices,default=TaskTypeChoices.ONETIME)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
