from django.urls import path,include
from rest_framework import routers
from tasks.views import TasksViewset,CategoryViewset

router = routers.DefaultRouter()
router.register(r'',TasksViewset)
router.register(r'category',CategoryViewset)

urlpatterns = [
]

urlpatterns += router.urls
