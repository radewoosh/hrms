from django.db import models

# Create your models here.
from employees.models import Employee


class Attendance(models.Model):

    STATUS_CHOICES = (
        ("present", "Present"),
        ("absent", "Absent"),
    )

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ("employee", "date")

    def __str__(self):
        return f"{self.employee} - {self.date}"