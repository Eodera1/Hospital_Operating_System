from rest_framework import serializers
from patients.models import Patient  # Import Patient model
from staff.models import Staff       # Import Staff model
from patients.serializers import PatientSerializer
from staff.serializers import StaffSerializer
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    # Nested read-only fields for GET requests
    patient = PatientSerializer(read_only=True)
    staff = StaffSerializer(read_only=True)
    
    # Write-only fields for POST requests, using PrimaryKeyRelatedField
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(),
        source='patient',
        write_only=True
    )
    staff_id = serializers.PrimaryKeyRelatedField(
        queryset=Staff.objects.all(),
        source='staff',
        write_only=True
    )

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'staff', 'patient_id', 'staff_id', 'date', 'status', 'created_at']
        extra_kwargs = {
            'date': {'required': True},
            'status': {'required': True},
            'created_at': {'read_only': True},
        }

    def create(self, validated_data):
        # Extract write-only fields
        patient = validated_data.pop('patient')
        staff = validated_data.pop('staff')
        # Create the appointment instance with the related objects
        appointment = Appointment.objects.create(
            patient=patient,
            staff=staff,
            **validated_data
        )
        return appointment

    def update(self, instance, validated_data):
        # Handle updates if needed
        patient = validated_data.pop('patient', instance.patient)
        staff = validated_data.pop('staff', instance.staff)
        instance.patient = patient
        instance.staff = staff
        instance.date = validated_data.get('date', instance.date)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance