from django.shortcuts import render
from notifications.models import Notification


# Create your views here.
from rest_framework import generics, permissions
from .models import Event, RSVP
from .serializers import EventSerializer, RSVPSerializer
from accounts.permissions import IsAdmin, IsAlumni


class CreateEventView(generics.CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdmin | IsAlumni]

    def perform_create(self, serializer):
        event = serializer.save(created_by=self.request.user)

        Notification.objects.create(
            user=self.request.user,
            message=f"Event '{event.title}' was created successfully."
    )


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all().order_by('date')
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]


class RSVPView(generics.CreateAPIView):
    serializer_class = RSVPSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EventRSVPListView(generics.ListAPIView):
    serializer_class = RSVPSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        event_id = self.kwargs["event_id"]
        return RSVP.objects.filter(event_id=event_id)
