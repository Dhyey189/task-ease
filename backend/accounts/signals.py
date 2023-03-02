from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User
from accounts.tasks import task_create_default_categories

# @receiver(pre_save, sender = User)
# def create_username(sender,instance,*args,**kwargs):
#     instance.username = str(instance.email)
#     instance

@receiver(post_save, sender = User)
def create_default_categories(sender,instance,created,*args,**kwargs):
    if created:
        print("In signal", instance)
        instance.username = str(instance.email)
        # create default categories for the user asyncronously using celery.
        instance.save()
        task_create_default_categories.delay(instance.id)
