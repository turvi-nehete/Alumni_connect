from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Chat(models.Model):
    participants = models.ManyToManyField(
        User,
        related_name="chats"
    )
    chat_type = models.CharField(
        max_length=20, 
        choices=[("dm", "Direct Message"), ("group", "Group")], 
        default="dm"
    )
    group_context = models.CharField(
        max_length=50, 
        blank=True, 
        null=True,
        help_text="Unique key for auto-groups (e.g., 'batch_2024')"
    )
    name = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.name:
            return f"{self.name} ({self.chat_type})"
        return f"Chat {self.id}"


class Message(models.Model):
    chat = models.ForeignKey(
        Chat,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sent_messages"
    )
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender}: {self.content[:20]}"
