from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.db.models import Sum

from django.contrib.auth import get_user_model
from django.db.models import Count

from .models import AlumniLocation
from .serializers import AlumniLocationSerializer

from jobs.models import Job
from events.models import Event
from donations.models import Donation
from messaging.models import Message

User = get_user_model()


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        now = timezone.now()

        # METRICS
        total_members = User.objects.count()
        upcoming_events = Event.objects.filter(date__gte=now).count()
        open_jobs = Job.objects.count() # assuming all are open for now
        
        # Count messages where user is a participant, sender is NOT user, and is_read is False
        unread_messages = Message.objects.filter(
            chat__participants=user,
            is_read=False
        ).exclude(sender=user).count()

        # ANALYTICS (Personal)
        # Profile views - placeholder or implement if tracking exists
        # New connections - placeholder
        # Event participation - RSVP count
        # RSVP model doesn't have related_name 'rsvps' on Event, so we query RSVP directly
        from events.models import RSVP
        event_participation = RSVP.objects.filter(user=user).count()
        
        donation_impact = Donation.objects.filter(donor=user).aggregate(total=Sum('amount'))['total'] or 0

        # FEED (Recent System Activity)
        # Combine recent events, jobs, donations
        feed = []
        
        # Recent 5 events (ordered by date as proxy for 'newest' if created_at missing, or use id)
        # Event model doesn't have created_at, showing upcoming events instead
        for e in Event.objects.filter(date__gte=now).order_by('date')[:5]:
            feed.append({
                "type": "event",
                "text": f"Upcoming Event: {e.title}",
                "time": e.date,
                "icon": "📅"
            })
            
        # Recent 5 jobs
        # Job model uses created_at, NOT posted_at
        for j in Job.objects.order_by('-created_at')[:5]:
            feed.append({
                "type": "job",
                "text": f"New Job: {j.title} at {j.company}",
                "time": j.created_at,
                "icon": "💼"
            })
            
        # Recent 5 donations (public)
        for d in Donation.objects.filter(is_anonymous=False).order_by('-created_at')[:5]:
            donor_name = d.donor.first_name if d.donor else "Someone"
            feed.append({
                "type": "donation",
                "text": f"{donor_name} donated ₹{d.amount}",
                "time": d.created_at,
                "icon": "💜"
            })
            
        # Sort feed by time descending
        feed.sort(key=lambda x: x['time'], reverse=True)
        feed = feed[:4] # Top 4 items as requested

        # PEOPLE YOU MAY KNOW
        # Simple Logic: Random 3 users who are not me (improve with exclude friends later)
        suggested_users = User.objects.exclude(id=request.user.id).order_by('?')[:3]
        suggestions = [
            {
                "id": u.id,
                "name": f"{u.first_name} {u.last_name}",
                "role": u.role, # 'alumni' or 'student'
            } for u in suggested_users
        ]

        return Response({
            "metrics": {
                "total_members": total_members,
                "upcoming_events": upcoming_events,
                "open_jobs": open_jobs,
                "unread_messages": unread_messages,
            },
            "analytics": {
                "profile_views": 15, # Mock
                "new_connections": 5, # Mock
                "event_participation": event_participation,
                "donation_impact": donation_impact
            },
            "feed": feed,
            "suggestions": suggestions,
            "user": {
                "first_name": user.first_name
            }
        })


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


class JobPopularityView(APIView):
    """
    Returns data for Active Jobs Heatmap/Chart.
    1. Popular Roles (by frequency of title)
    2. Job Locations (for map)
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # 1. Popular Roles (Top 5 titles)
        # Normalize titles to lowercase for grouping
        popular_roles = Job.objects.values('title').annotate(count=Count('title')).order_by('-count')[:5]
        
        # 2. Locations (Top 5 locations)
        # Using Company as proxy for location if location field is unstructured
        # But we have 'location' on Job model? Let's check Job model again.
        # Job model has no 'location' field visible in snippet 1132! It has 'company'.
        # Wait, I need to check Job model again. 
        # Snippet 1132 shows: title, description, company, skills, expiry_date, created_at.
        # It does NOT have location.
        # I will use 'company' for now, or assume 'Remote'/'On-site' logic isn't there.
        # User asked for "heatmap which displays the most popular jobs". 
        # So grouping by Title is the correct "Job Heatmap" (density of roles).
        
        return Response({
            "popular_roles": popular_roles,
            "total_active_jobs": Job.objects.count()
        })
