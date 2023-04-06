from celery import shared_task
from tasks.models import Categories
from accounts.models import User,UserGoal
from django.core.mail import send_mail
from tasks.models import Task
from statuses.models import Status,TaskStatus
from datetime import datetime, timedelta
from django.db import transaction 

@shared_task
@transaction.atomic
def task_create_default_categories(user_id):
    # categories work,home,education,health,finance,other
    user = User.objects.get(id = user_id)
    Categories.objects.bulk_create([
        Categories(name = "work", user = user),
        Categories(name = "home",description = "This can include tasks related to your home, such as repairs, maintenance, and renovations.",user = user),
        # Categories(name = "education",description = "This can include tasks related to your education, such as homework assignments, studying, and researching.", user = user),
        # Categories(name = "health", description = "This can include tasks related to your health, such as doctor's appointments, taking medication, exercising, and tracking your food intake.",user = user),
        # Categories(name = "finance", description = "This can include tasks related to managing your finances, such as paying bills, creating a budget, tracking expenses, and planning for savings.",user = user),
        Categories(name = "other",description = "This can include any task.",user = user)
    ])
    print("Categories created!")


@shared_task
@transaction.atomic
def task_send_user_onboarding_mail(user_id):
    try:
        user = User.objects.get(id = user_id)
        send_mail("Welcome to TaskEase",f"Hello, {user.name}\n\n\tWelcome to TaskEase, here you can store,manage and acknowledge your day to day tasks easily.\n\nThanks & Regards,\nTeam TaskEase","taskeaseapp@gmail.com",[user.email])
    except:
        print("Error in tasks sending mail!")


@shared_task
@transaction.atomic
def task_send_remainders_before_twelve_hours():
    query_set = Task.objects.all()
    twelve_hours_after_datetime = datetime.now() + timedelta(hours = 12)
    query_set = query_set.filter(scheduled_at__range = (datetime.now(),twelve_hours_after_datetime), current_status = Status.objects.get(name = 'open'), is_sent_remainder_12_hour = False).exclude(scheduled_at__range = (datetime.now(),datetime.now()+timedelta(hours=4)))
    for task in query_set:
        send_mail("Remainder: For your task", f"Hello, {task.user.name}\n\n\tYour task needs some action, less than 12 hours left before its schedule. If completed then ignore the mail and also mark it as completed on TaskEase app.Thank you for using TaskEase.\n\n\tBelow are some details related to incomplete task:-\n\t\tTask Name:-{task.name}\n\t\tTask Description:-{task.description}\n\t\tTask Category:- {task.category.name}\n\nThanks & Regards,\nTeam TaskEase","taskeaseapp@gmail.com",[task.user.email])
        task.is_sent_remainder_12_hour = True
        task.save()
    pass

@shared_task
@transaction.atomic
def task_send_remainders_before_four_hours():
    query_set = Task.objects.all()
    four_hours_after_datetime = datetime.now() + timedelta(hours = 4)
    query_set = query_set.filter(scheduled_at__range = (datetime.now(),four_hours_after_datetime), current_status = Status.objects.get(name = 'open'), is_sent_remainder_4_hour = False)
    for task in query_set:
        send_mail("Remainder: For your task", f"Hello, {task.user.name}\n\n\tYour task needs some action, less than 4 hours left before its schedule. If completed then ignore the mail and also mark it as completed on TaskEase app.Thank you for using TaskEase.\n\n\tBelow are some details related to incomplete task:-\n\t\tTask Name:-{task.name}\n\t\tTask Description:-{task.description}\n\t\tTask Category:- {task.category.name}\n\nThanks & Regards,\nTeam TaskEase","taskeaseapp@gmail.com",[task.user.email])
        task.is_sent_remainder_4_hour = True
        task.save()
    pass


@shared_task
@transaction.atomic
def task_make_open_expired_task_missed():
    query_set = Task.objects.all()
    query_set = query_set.filter(current_status = Status.objects.get(name = "open"), scheduled_at__lte = datetime.now())
    for task in query_set:
        # changing is_current flag of TaskStatus
        task_status = TaskStatus.objects.get(task = task, status = Status.objects.get(name = "open"))
        task_status.is_current = False
        task_status.save()

        # changing current status of task to missed
        task.current_status = Status.objects.get(name = "missed")
        task.save()

        # creating new instance for the task with missed status 
        TaskStatus.objects.create(task = task,status = Status.objects.get(name = "missed"), is_current = True)

@shared_task
@transaction.atomic
def task_referesh_daily_goal():
    users = User.objects.all()
    for user in users:
        goal, updated = UserGoal.objects.update_or_create(user = user, tasks_done = 0, total_tasks_done = Task.object.filter(user = user,current_status = Status.objects.get(name = "accomplished")).count())
