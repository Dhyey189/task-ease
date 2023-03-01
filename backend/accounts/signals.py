from django.db.models.signals import pre_save,post_save
from accounts.models import User

@receiver(pre_save, sender = User)
def create_username(sender,instance,*args,**kwargs):
    instance.username = str(instance.email)

@receiver(post_save, sender = User)
def create_default_categories(sender,instance,created,*args,**kwargs):
    if created:
        # create default categories for the user.
        pass
