from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model
from django.db.models import Count

from .models import AlumniLocation
from .serializers import AlumniLocationSerializer

from jobs.models import Job
from events.models import Event
from donations.models import Donation

User = get_user_model()


class AlumniHeatmapView(APIView):
    """
    Returns alumni coordinates for map visualization.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        locations = AlumniLocation.objects.all()
        serializer = AlumniLocationSerializer(locations, many=True)
        return Response(serializer.data)


class EngagementStatsView(APIView):
    """
    High-level platform stats for admin dashboard.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            "total_users": User.objects.count(),
            "total_alumni": User.objects.filter(role="alumni").count(),
            "total_students": User.objects.filter(role="student").count(),
            "jobs_posted": Job.objects.count(),
            "events_created": Event.objects.count(),
            "total_donations": Donation.objects.count(),
        }

        return Response(data)
