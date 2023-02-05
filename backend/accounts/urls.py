from django.urls import path,include
from accounts.views import GoogleLoginApi

urlpatterns = [
    path('signin/google/',GoogleLoginApi.as_view(),name = "user-account-signin-google"),
]
