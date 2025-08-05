from django.db import models
from patients.models import Patient
from staff.models import Staff
from django.utils import timezone

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(default=timezone.now)
