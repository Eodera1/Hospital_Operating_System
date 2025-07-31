from rest_framework import serializers
from .models import Appointment
from patients.serializers import PatientSerializer
from staff.serializers import StaffSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    staff = StaffSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.all(), source='patient', write_only=True)
    staff_id = serializers.PrimaryKeyRelatedField(queryset=Staff.objects.all(), source='staff', write_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'staff', 'patient_id', 'staff_id', 'date', 'status', 'created_at']