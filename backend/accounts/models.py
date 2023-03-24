import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15,blank=True)
    picture = models.CharField(max_length=1000,blank=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    REQUIRED_FIELDS = []

class UserGoal(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tasks_todo = models.IntegerField(default=3)
    tasks_done = models.IntegerField(default=0)
    total_tasks_done = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
