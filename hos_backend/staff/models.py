from django.db import models
from django.utils import timezone

class Staff(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    created_at = models.DateTimeField(default=timezone.now)
