from rest_framework import serializers
from .models import Event, RSVP


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ['created_by']


class RSVPSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    role = serializers.CharField(source="user.role", read_only=True)

    class Meta:
        model = RSVP
        fields = ['id', 'event', 'status', 'user_email', 'first_name', 'last_name', 'role']
