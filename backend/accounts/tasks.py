from celery import shared_task
from tasks.models import Categories
from accounts.models import User
@shared_task
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
