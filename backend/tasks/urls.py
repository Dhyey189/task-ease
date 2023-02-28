from django.urls import path,include
from rest_framework import routers
from tasks.views import TasksViewset

router = routers.DefaultRouter()
router.register(r'',TasksViewset)

urlpatterns = [
]

urlpatterns += router.urls
