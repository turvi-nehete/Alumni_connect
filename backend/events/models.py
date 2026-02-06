from django.db import models

# Create your models here.
from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Event(models.Model):
    AUDIENCE_CHOICES = (
        ('student', 'Student'),
        ('alumni', 'Alumni'),
        ('all', 'All'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    audience = models.CharField(max_length=10, choices=AUDIENCE_CHOICES, default='all')

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='created_events'
    )

    def __str__(self):
        return self.title


class RSVP(models.Model):
    STATUS_CHOICES = (
        ('going', 'Going'),
        ('maybe', 'Maybe'),
        ('not_going', 'Not Going'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ('user', 'event')  # prevents duplicate RSVP

    def __str__(self):
        return f"{self.user} -> {self.event} ({self.status})"
