from rest_framework import serializers
from tasks.models import Task,Categories
from datetime import datetime

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id','name', 'user','description', 'color_code']

class TaskSerializer(serializers.ModelSerializer):
    category_obj = serializers.SerializerMethodField(read_only = True)
    scheduled_at = serializers.SerializerMethodField()


    class Meta:
        model = Task
        fields = ['id','user','name','category','description','category_obj','task_type','priority','scheduled_at']
    
    def get_category_obj(self, obj):
        category_obj = Categories.objects.get(id = obj.category.id)
        return CategorySerializer(category_obj).data
    
    def get_scheduled_at(self, obj):
        date = obj.scheduled_at.strftime("%-d, %b, %Y ,%-I:%S %p")
        return date
    
    