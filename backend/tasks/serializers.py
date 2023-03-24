from rest_framework import serializers
from tasks.models import Task, Categories
from datetime import datetime,timedelta
from django.utils import timezone
from django.core.exceptions import ValidationError


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ["id", "name", "user", "description", "color_code"]


class TaskSerializer(serializers.ModelSerializer):
    category_obj = serializers.SerializerMethodField(read_only=True)
    # deadline_at is for reading and scheduled_at is for writing both are same.
    deadline_at = serializers.SerializerMethodField()
    current_status = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            "id",
            "user",
            "name",
            "category",
            "description",
            "current_status",
            "category_obj",
            "task_type",
            "priority",
            "scheduled_at",
            "deadline_at",
            "completed_at"
        ]

    def __init__(self, instance=None, data=..., **kwargs):
        print(data)
        if data != Ellipsis and data["scheduled_at"]:
            value = data["scheduled_at"][:-31]
            print(value)
            data["scheduled_at"] = datetime.strptime(value, "%a %b %d %Y %H:%M:%S")
        super().__init__(instance, data, **kwargs)

    def validate(self, attrs):
        print(attrs)
        return super().validate(attrs)

    def get_category_obj(self, obj):
        category_obj = Categories.objects.get(id=obj.category.id)
        return CategorySerializer(category_obj).data

    def get_deadline_at(self, obj):
        deadline_in_ist = obj.scheduled_at + timedelta(hours=5,minutes=30)
        date = deadline_in_ist.strftime("%-d, %b, %Y ,%-I:%M %p")
        return date

    def get_current_status(self, obj):
        return obj.current_status.name
    
    def get_completed_at(self, obj):
        if obj.completed_at:
            completed_at_in_ist = obj.completed_at + timedelta(hours=5,minutes=30)
            date = completed_at_in_ist.strftime("%-d, %b, %Y ,%-I:%M %p")
            return date
        else:
            return ""

