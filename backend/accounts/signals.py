from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User
from accounts.tasks import task_create_default_categories, task_send_user_onboarding_mail

# @receiver(pre_save, sender = User)
# def create_username(sender,instance,*args,**kwargs):
#     instance.username = str(instance.email)
#     instance

@receiver(post_save, sender = User)
def create_default_categories(sender,instance,created,*args,**kwargs):
    if created:
        print("In signal", instance)
        if len(instance.username) < 1:
            instance.username = str(instance.email)
        if len(instance.email) < 1:
            instance.email = instance.username + "@default.com"
        # create default categories for the user asyncronously using celery.
        instance.save()
        task_create_default_categories.delay(instance.id)
        task_send_user_onboarding_mail.delay(instance.id)
