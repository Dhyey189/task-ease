from rest_framework import serializers

from tasks.models import Task,Categories

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','user','name', 'description','task_type','priority','scheduled_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id','name', 'description', 'color_code']