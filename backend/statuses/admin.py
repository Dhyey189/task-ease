from django.contrib import admin
from statuses.models import Status,TaskStatus
# Register your models here.

@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'description', 'updated_at')


@admin.register(TaskStatus)
class TaskStatusAdmin(admin.ModelAdmin):
    list_display = ('id','task', 'task_status', 'updated_at')

    def task_status(self,obj):
        return obj.status.name