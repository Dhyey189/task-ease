from django.shortcuts import render,get_object_or_404
from django.db import transaction 
from rest_framework import viewsets
from tasks.models import Task,Categories
from accounts.models import User,UserGoal
from accounts.serializers import UserGoalSerializer
from tasks.serializers import TaskSerializer,CategorySerializer
# from django.utils.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from statuses.models import Status, TaskStatus
from datetime import datetime,timedelta
from django.utils import timezone
# Create your views here.

class TasksViewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        print(request.body)
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
    tasks = Task.objects.filter(user = user).order_by("current_status")
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
    tasks = Task.objects.filter(user = user).order_by("current_status")
    serializer = TaskSerializer(tasks,many = True)
    return Response(serializer.data,status=201)

@api_view(['GET'])
@transaction.atomic
def mark_task_as_completed(request, pk = None, task_id = None):
    print(task_id)
    task = Task.objects.get(id = task_id)
    # for status open
    status = Status.objects.get(name = "open")
    task_status = TaskStatus.objects.get(task = task,status = status, is_current = True)
    task_status.is_current = False
    task_status.save()

    TaskStatus.objects.create(task = task, status = Status.objects.get(name = "accomplished"), is_current = True)

    task.current_status = Status.objects.get(name = "accomplished")
    task.completed_at = datetime.now()
    task.save()

    user = get_object_or_404(User,id = pk)
    tasks = Task.objects.filter(user = user).order_by("current_status")
    serializer = TaskSerializer(tasks,many = True)
    return Response(serializer.data,status=201)


@api_view(["GET"])
@transaction.atomic
def get_user_goal(request, user_id = None):
    user = User.objects.get(id = user_id)
    user_goal,created = UserGoal.objects.get_or_create(user = user)
    user_goal.tasks_done = Task.objects.filter(user = user,current_status = Status.objects.get(name = "accomplished"), completed_at__year = datetime.today().year, completed_at__month = datetime.today().month, completed_at__day = datetime.today().day).count()
    user_goal.total_tasks_done = Task.objects.filter(user = user,current_status = Status.objects.get(name = "accomplished")).count()
    user_goal.save()
    return Response(UserGoalSerializer(user_goal).data,status=200) 

@api_view(["post"])
@transaction.atomic
def set_user_goal(request, user_id = None, goal = None):
    user = User.objects.get(id = user_id)
    user_goal = UserGoal.objects.get(user = user)
    user_goal.tasks_done = Task.objects.filter(user = user,current_status = Status.objects.get(name = "accomplished"), completed_at__year = datetime.today().year, completed_at__month = datetime.today().month, completed_at__day = datetime.today().day).count()
    user_goal.tasks_todo = goal
    user_goal.save()
    return Response(UserGoalSerializer(user_goal).data, status=201)

def get_last_six_months():
    now = datetime.now()
    result = [now.strftime("%B %Y")]
    for _ in range(0, 6):
        now = now.replace(day=1) - timedelta(days=1)
        result.append(now.strftime("%B %Y"))
    result.reverse()

    return result[-6:] if len(result) > 6 else result

@api_view(["GET"])
@transaction.atomic
def get_analysis_data(request, user_id):
    user = User.objects.get(id = user_id)
    last_six_months = get_last_six_months()
    statuses = ["total","open", "accomplished", "missed" ,"archive"] 
    analysis_data = []
    for status in statuses:
        # {"x" month_year , "y" : count}
        number_of_task = []
        for month_year in last_six_months:
            column = {}
            column["x"] = month_year
            month_datetime = datetime.strptime(month_year,'%B %Y')
            if status == "open":
                column["y"] = TaskStatus.objects.filter(task__user = user,status = Status.objects.get(name = status), created_at__month = month_datetime.month, is_current = True).count()
            elif status == "total":
                column["y"] = TaskStatus.objects.filter(task__user = user,status = Status.objects.get(name = "open"), created_at__month = month_datetime.month).count()
            else:
                column["y"] = TaskStatus.objects.filter(task__user = user,status = Status.objects.get(name = status), created_at__month = month_datetime.month).count()
            number_of_task.append(column)
        status_data = {
            "dataSource": number_of_task,
            "xName": 'x',
            "yName": 'y',
            "name": status,
            "type": 'Column',
            "marker": {
                "dataLabel": {
                    "visible": "true",
                    "position": 'Top',
                    "font": { "fontWeight": '600', "color": '#ffffff' },
                },
            },
        }
        analysis_data.append(status_data)
    return Response(analysis_data,200)