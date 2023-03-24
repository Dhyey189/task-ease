from django.contrib import admin 
from accounts.models import User,UserGoal
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id','name','email','created_at','updated_at')

@admin.register(UserGoal)
class UserGoalAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', "tasks_todo","tasks_done","total_tasks_done","created_at")
