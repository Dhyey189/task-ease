from rest_framework import serializers
from accounts.models import User,UserGoal

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name','email','phone_number','picture']
    

class UserGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGoal
        fields = ['user', 'tasks_todo', 'tasks_done' , 'total_tasks_done']