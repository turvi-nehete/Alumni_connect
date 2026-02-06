import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alumniconnect.settings')
django.setup()

from messaging.models import Message, Chat
from django.contrib.auth import get_user_model

User = get_user_model()

def check_messages():
    print("Checking Messages...")
    count = Message.objects.count()
    print(f"Total Messages: {count}")
    
    for msg in Message.objects.all().order_by('-created_at')[:5]:
        print(f"ID: {msg.id} | Sender: {msg.sender} | Content: {msg.content}")

if __name__ == "__main__":
    check_messages()
