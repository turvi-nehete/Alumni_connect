from django.db import models
from django.conf import settings
from profiles.models import Skill

User = settings.AUTH_USER_MODEL


class Job(models.Model):
    posted_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="jobs_posted"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    company = models.CharField(max_length=200)
    skills = models.ManyToManyField(Skill, related_name="jobs")
    expiry_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} at {self.company}"


class JobApplication(models.Model):
    STATUS_CHOICES = (
        ("applied", "Applied"),
        ("reviewed", "Reviewed"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="job_applications"
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="applied"
    )
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("job", "student")

    def __str__(self):
        return f"{self.student} → {self.job}"
