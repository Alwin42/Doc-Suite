from django.contrib import admin
from django.urls import path
from docs.views import verify_pin  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/verify-pin/', verify_pin, name='verify_pin'), 
]