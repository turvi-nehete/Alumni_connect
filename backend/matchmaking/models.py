from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class MatchScore(models.Model):
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="match_scores_student"
    )
    alumni = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="match_scores_alumni"
    )
    score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("student", "alumni")
        ordering = ["-score"]

    def __str__(self):
        return f"{self.student} ↔ {self.alumni} ({self.score:.2f})"
