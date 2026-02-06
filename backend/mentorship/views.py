import uuid
from django.db import models

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from notifications.models import Notification
from .models import MentorshipSlot, MentorshipSession
from .serializers import (
    MentorshipSlotSerializer,
    CreateSlotSerializer,
    MentorshipSessionSerializer
)


class CreateSlotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "alumni":
            return Response(
                {"error": "Only alumni can create mentorship slots"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = CreateSlotSerializer(data=request.data)
        if serializer.is_valid():
            slot = serializer.save(alumni=request.user)
            return Response(
                MentorshipSlotSerializer(slot).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListAvailableSlotsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        slots = MentorshipSlot.objects.filter(is_booked=False)
        serializer = MentorshipSlotSerializer(slots, many=True)
        return Response(serializer.data)


class BookSlotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slot_id):
        if request.user.role != "student":
            return Response(
                {"error": "Only students can book mentorship"},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            slot = MentorshipSlot.objects.get(id=slot_id, is_booked=False)
        except MentorshipSlot.DoesNotExist:
            return Response(
                {"error": "Slot not available"},
                status=status.HTTP_404_NOT_FOUND
            )

        slot.is_booked = True
        slot.save()

        Notification.objects.create(
            user=slot.alumni,
            message=f"{request.user.email} booked a mentorship session with you."
        )

        meet_link = f"https://meet.fake/{uuid.uuid4().hex[:8]}"

        session = MentorshipSession.objects.create(
            slot=slot,
            student=request.user,
            meet_link=meet_link
        )

        return Response(
            MentorshipSessionSerializer(session).data,
            status=status.HTTP_201_CREATED
        )


class MyMentorshipSessionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = MentorshipSession.objects.filter(
            models.Q(student=request.user) |
            models.Q(slot__alumni=request.user)
        )
        serializer = MentorshipSessionSerializer(sessions, many=True)
        return Response(serializer.data)
