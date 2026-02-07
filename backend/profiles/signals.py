from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Profile

User = settings.AUTH_USER_MODEL


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        try:
            Profile.objects.create(user=instance)
        except Exception as e:
            # Log the error but don't crash the user creation
            print(f"CRITICAL ERROR creating profile for user {instance.email}: {e}")
