from django.shortcuts import render,get_object_or_404
from django.db import transaction 
from rest_framework import viewsets
from tasks.models import Task,Categories
from accounts.models import User
from tasks.serializers import TaskSerializer,CategorySerializer
# from django.utils.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from statuses.models import Status, TaskStatus
# Create your views here.

class TasksViewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        instance = super().create(request, *args, **kwargs)
        TaskStatus.objects.create(status = Status.objects.get(id = 1), task = Task.objects.get(id = instance.data["id"]))
        return instance


    
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


@api_view(['GET'])
@transaction.atomic
def soft_delete_task(request, pk = None, task_id = None):
    print(task_id)
    task = Task.objects.get(id = task_id)
    # for status open
    status = Status.objects.get(name = "open")
    task_status = TaskStatus.objects.get(task = task,status = status, is_current = True)
    task_status.is_current = False
    task_status.save()

    TaskStatus.objects.create(task = task, status = Status.objects.get(name = "archive"))

    task.current_status = Status.objects.get(name = "archive")
    task.save()

    user = get_object_or_404(User,id = pk)
    tasks = Task.objects.filter(user = user)
    serializer = TaskSerializer(tasks,many = True)
    return Response(serializer.data,status=201)



