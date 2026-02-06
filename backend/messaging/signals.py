from django.db.models.signals import post_save
from django.dispatch import receiver
from profiles.models import Profile
from .models import Chat

@receiver(post_save, sender=Profile)
def add_user_to_auto_groups(sender, instance, created, **kwargs):
    """
    Automatically adds user to:
    1. Batch Group (based on graduation_year)
    2. Company Group (based on company)
    """
    user = instance.user
    
    # 1. BATCH GROUP
    if instance.graduation_year:
        batch_key = f"batch_{instance.graduation_year}"
        batch_name = f"Class of {instance.graduation_year}"
        
        chat, _ = Chat.objects.get_or_create(
            group_context=batch_key,
            defaults={
                "chat_type": "group",
                "name": batch_name
            }
        )
        chat.participants.add(user)

    # 2. COMPANY GROUP
    if instance.company:
        # Normalize company name (simple lowercase match for now)
        company_cleaned = instance.company.strip().title()
        company_key = f"company_{company_cleaned.replace(' ', '_').lower()}"
        company_name = f"{company_cleaned} Network"
        
        chat, _ = Chat.objects.get_or_create(
            group_context=company_key,
            defaults={
                "chat_type": "group",
                "name": company_name
            }
        )
        chat.participants.add(user)
