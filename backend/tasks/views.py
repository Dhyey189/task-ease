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

    # return list of all task created by user
    def retrieve(self, request, pk=None):
        user = get_object_or_404(User,id = pk)
        tasks = self.queryset.filter(user = user)
        serializer = self.serializer_class(tasks,many = True)
        return Response(serializer.data,status=200)
    

class CategoryViewset(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategorySerializer

    # return list of all categories created by user
    def retrieve(self, request, pk=None):
        user = get_object_or_404(User,id = pk)
        tasks = self.queryset.filter(user = user)
        serializer = self.serializer_class(tasks,many = True)
        return Response(serializer.data,status=200)

# @api_view
# def list_all_categories(request):



