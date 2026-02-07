from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model

from .models import Chat, Message
from .utils import get_or_create_chat

User = get_user_model()


class MyChatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chats = request.user.chats.all()
        data = []

        for chat in chats:
            participants = chat.participants.exclude(id=request.user.id)
            data.append({
                "chat_id": chat.id,
                "name": chat.name,
                "chat_type": chat.chat_type,
                "participants": [
                    {
                        "id": p.id,
                        "name": f"{p.first_name} {p.last_name}".strip() or p.email,
                        "email": p.email,
                        "role": p.role
                    } for p in participants
                ]
            })

        return Response(data)


class CreateChatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        other_user_id = request.data.get("user_id")
        other_user = User.objects.get(id=other_user_id)

        chat = get_or_create_chat(request.user, other_user)

        return Response({
            "chat_id": chat.id
        })


class ChatMessagesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, chat_id):
        messages = Message.objects.filter(
            chat_id=chat_id
        ).order_by("created_at")

        data = [
            {
                "id": m.id,
                "sender": m.sender.email, # Stable ID for "isMe" check
                "sender_name": f"{m.sender.first_name} {m.sender.last_name}".strip() or m.sender.email,
                "content": m.content,
                "timestamp": m.created_at
            }
            for m in messages
        ]

        return Response(data)


class DeleteMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, message_id):
        try:
            message = Message.objects.get(id=message_id, sender=request.user)
            message.delete()
            return Response({"status": "deleted"})
        except Message.DoesNotExist:
            return Response({"error": "Message not found or unauthorized"}, status=404)
from rest_framework.decorators import api_view, permission_classes

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def send_message(request, chat_id):
    content = request.data.get("message")

    if not content:
        return Response({"error": "Empty message"}, status=400)

    # Ensure user belongs to chat
    try:
        chat = Chat.objects.get(id=chat_id, participants=request.user)
    except Chat.DoesNotExist:
        return Response({"error": "Unauthorized chat"}, status=403)

    msg = Message.objects.create(
        chat=chat,
        sender=request.user,
        content=content
    )

    return Response({
        "id": msg.id,
        "sender": request.user.email,
        "sender_name": f"{request.user.first_name} {request.user.last_name}".strip() or request.user.email,
        "content": msg.content,
        "timestamp": msg.created_at
    })
