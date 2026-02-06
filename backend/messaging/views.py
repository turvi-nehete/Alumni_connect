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
                "participants": [str(p) for p in participants]
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
                "sender": str(m.sender),
                "content": m.content,
                "timestamp": m.created_at
            }
            for m in messages
        ]

        return Response(data)
