from django.urls import path, include
from rest_framework import routers
from tasks.views import (
    TasksViewset,
    CategoryViewset,
    get_tasks_list,
    get_categories_list,
    soft_delete_task,
    mark_task_as_completed,
    get_user_goal,
    set_user_goal
)

router = routers.DefaultRouter()
router.register(r"task", TasksViewset)
router.register(r"category", CategoryViewset)

urlpatterns = [
    path("tasks-list/<int:pk>/", get_tasks_list, name="tasks-list"),
    path("categories-list/<int:pk>/", get_categories_list, name="categories-list"),
    path(
        "task-soft-delete/<int:pk>/<int:task_id>/",
        soft_delete_task,
        name="soft-delete-task",
    ),
    path(
        "task-mark-as-completed/<int:pk>/<int:task_id>/",
        mark_task_as_completed,
        name="task-mark-as-completed",
    ),
    path(
        "get-user-goal/<int:user_id>/",
        get_user_goal,
        name="get-user-goal"
    ),
    path(
        "set-user-goal/<int:user_id>/<int:goal>/",
        set_user_goal,
        name="set-user-goal"
    ),
]

urlpatterns += router.urls
