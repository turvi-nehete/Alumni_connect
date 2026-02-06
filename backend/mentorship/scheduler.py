from django.utils import timezone
from .models import MentorshipSlot


def expire_old_slots():
    """
    Marks past slots as unavailable.
    Intended to be run via cron / celery.
    """
    MentorshipSlot.objects.filter(
        end_time__lt=timezone.now(),
        is_booked=False
    ).update(is_booked=True)
