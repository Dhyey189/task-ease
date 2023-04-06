from __future__ import absolute_import, unicode_literals
import os

from celery import Celery
from django.conf import settings
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE','taskease.settings')

app = Celery('taskease')
app.conf.enable_utc = False

app.conf.update(timezone = 'Asia/Kolkata')

app.config_from_object(settings, namespace = 'CELERY')

# Celery Beat Settings
app.conf.beat_schedule = {
    # Executes every Monday morning at 7:30 a.m.
    'send-remainders-before-twelve-hours': {
        'task': 'accounts.tasks.task_send_remainders_before_twelve_hours',
        'schedule': crontab(minute="*/15"),
    },
    'send-remainders-before-four-hours': {
        'task': 'accounts.tasks.task_send_remainders_before_four_hours',
        'schedule': crontab(minute="*/10"),
    },
    'make-open-expired-task-missed' : {
        'task' : 'accounts.tasks.task_make_open_expired_task_missed',
        'schedule' : crontab(minute="*/2"),
    },
    'referesh-daily-goal' : {
        'task' : 'accounts.tasks.task_referesh_daily_goal',
        'schedule' : crontab(minute=0, hour=0) 
    }
}

app.autodiscover_tasks()

@app.task(bind = True)
def debug_task(self):
    print(f'Request: {self.request!r}')


# command to start celery in windows
# cmd = 'celery -A taskease.celery worker --pool=solo -l info'