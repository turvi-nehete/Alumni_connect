from .models import Chat


def get_or_create_chat(user1, user2):
    chat = Chat.objects.filter(
        participants=user1,
        chat_type='dm'
    ).filter(
        participants=user2
    ).first()

    if not chat:
        chat = Chat.objects.create()
        chat.participants.add(user1, user2)

    return chat
