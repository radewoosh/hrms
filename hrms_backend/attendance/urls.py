from django.urls import path
from .views import *

urlpatterns = [
path("", MarkAttendanceView.as_view()),
path("employee/", EmployeeAttendanceView.as_view()),
]