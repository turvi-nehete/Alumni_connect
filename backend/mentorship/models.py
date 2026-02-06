from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class MentorshipSlot(models.Model):
    alumni = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="mentorship_slots"
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_booked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.alumni} | {self.start_time}"


class MentorshipSession(models.Model):
    slot = models.OneToOneField(
        MentorshipSlot,
        on_delete=models.CASCADE,
        related_name="session"
    )
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="mentorship_sessions"
    )
    meet_link = models.URLField()
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student} with {self.slot.alumni}"

