from django.contrib import admin 
from accounts.models import User
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id','name','email','created_at','updated_at')
