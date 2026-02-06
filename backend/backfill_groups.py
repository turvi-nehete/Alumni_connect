import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alumniconnect.settings')
django.setup()

from profiles.models import Profile, Skill
from messaging.models import Chat
from django.contrib.auth import get_user_model

User = get_user_model()

print("=== TRIGGERING SIGNALS ===")
# Save all profiles to trigger signals
for p in Profile.objects.all():
    print(f"Saving profile for {p.user.email} (Batch: {p.graduation_year}, Company: {p.company})")
    p.save()

print("\n=== VERIFYING GROUPS ===")
for c in Chat.objects.filter(chat_type="group"):
    print(f"Group: '{c.name}' (Context: {c.group_context})")
    print(f"  Participants: {[u.email for u in c.participants.all()]}")
