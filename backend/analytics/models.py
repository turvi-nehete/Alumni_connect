from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class AlumniLocation(models.Model):
    alumni = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="location"
    )
    latitude = models.FloatField()
    longitude = models.FloatField()
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.alumni} - {self.city}, {self.country}"
