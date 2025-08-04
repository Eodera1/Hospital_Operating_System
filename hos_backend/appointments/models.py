from django.db import models
from patients.models import Patient
from staff.models import Staff

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=20)
