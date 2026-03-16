from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Attendance
from .serializers import AttendanceSerializer

class MarkAttendanceView(generics.CreateAPIView):

    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

    def post(self, request):

        employee = request.data.get("employee")
        date = request.data.get("date")
        status_value = request.data.get("status")

        attendance, created = Attendance.objects.update_or_create(
            employee_id=employee,
            date=date,
            defaults={"status": status_value}
        )

        serializer = AttendanceSerializer(attendance)

        return Response(serializer.data, status=status.HTTP_200_OK)


class EmployeeAttendanceView(generics.ListAPIView):

    serializer_class = AttendanceSerializer

    def get_queryset(self):

        employee_id = self.request.query_params.get("employee")

        return Attendance.objects.filter(employee_id=employee_id)