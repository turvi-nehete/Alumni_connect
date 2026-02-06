from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Event, RSVP
from .serializers import EventSerializer, RSVPSerializer
from accounts.permissions import IsAdmin, IsAlumni


class CreateEventView(generics.CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin | IsAlumni]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]


class RSVPView(generics.CreateAPIView):
    serializer_class = RSVPSerializer
    permission_classes = [permissions.IsAuthenticated]

from notifications.models import Notification
from django.contrib.auth import get_user_model

User = get_user_model()

def perform_create(self, serializer):
    event = serializer.save(created_by=self.request.user)

    users = User.objects.all()

    notifications = [
        Notification(
            user=user,
            message=f"New event posted: {event.title}"
        )
        for user in users
    ]

    Notification.objects.bulk_create(notifications)
