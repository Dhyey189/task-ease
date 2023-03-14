from django.urls import path,include
from rest_framework import routers
from tasks.views import TasksViewset,CategoryViewset,get_tasks_list,get_categories_list

router = routers.DefaultRouter()
router.register(r'task',TasksViewset)
router.register(r'category',CategoryViewset)

urlpatterns = [
    path('tasks-list/<int:pk>/', get_tasks_list, name = "tasks-list"),
    path('categories-list/<int:pk>/', get_categories_list, name = "categories-list")
]

urlpatterns += router.urls
