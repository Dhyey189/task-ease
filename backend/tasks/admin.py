from django.contrib import admin
from accounts.models import User
from tasks.models import Task,Categories
# Register your models here.

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id','name','description','created_at','updated_at')


@admin.register(Categories)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id','name','color_code','created_at','updated_at')

