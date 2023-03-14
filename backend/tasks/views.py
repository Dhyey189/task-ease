from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets
from tasks.models import Task,Categories
from accounts.models import User
from tasks.serializers import TaskSerializer,CategorySerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

class TasksViewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    
class CategoryViewset(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer

# return list of all task created by user
@api_view(['GET'])
def get_tasks_list(request, pk = None):
    user = get_object_or_404(User,id = pk)
    tasks = Task.objects.filter(user = user)
    serializer = TaskSerializer(tasks,many = True)
    return Response(serializer.data,status=200)
    



# return list of all categories created by user
@api_view(['GET'])
def get_categories_list(request, pk = None):
    user = get_object_or_404(User,id = pk)
    tasks = Categories.objects.filter(user = user)
    serializer = CategorySerializer(tasks,many = True)
    return Response(serializer.data,status=200)


