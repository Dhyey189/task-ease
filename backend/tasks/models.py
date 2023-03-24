from django.db import models
from datetime import datetime,timedelta
from accounts.models import User 
from django.utils.timezone import timezone
# Create your models here.




class Categories(models.Model):
    # name of category is unique case insensitive
    name = models.CharField(max_length=50, default = "work")
    description = models.CharField(max_length=255, default = "This can include tasks related to your job or career, such as deadlines, meetings, projects, and tasks that you need to complete for work.")
    user = models.ForeignKey(User,null=True,on_delete=models.SET_NULL)
    color_code = models.CharField(max_length=7, default="#ffffff")
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class Meta:
        unique_together = (('name','user'),)

class Task(models.Model):
    class TaskTypeChoices(models.TextChoices):
        ONETIME = "onetime"
        RECURRING = "recurring"

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.ForeignKey(Categories,null=True,on_delete=models.SET_NULL)
    priority = models.IntegerField(default=1)
    scheduled_at = models.DateTimeField(editable=True)
    completed_at = models.DateTimeField(editable=True,null = True)
    is_sent_remainder_12_hour = models.BooleanField(default = False)
    is_sent_remainder_4_hour = models.BooleanField(default = False)
    task_type = models.CharField(max_length=50,choices=TaskTypeChoices.choices,default=TaskTypeChoices.ONETIME)
    current_status = models.ForeignKey("statuses.Status",null = True, on_delete=models.CASCADE, default = 1)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
