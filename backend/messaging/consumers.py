
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from django.contrib.auth import get_user_model
from .models import Chat, Message
from .utils import get_or_create_chat

User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        print("DEBUG: Connection updated...")
        from rest_framework_simplejwt.tokens import UntypedToken
        from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
        from django.contrib.auth import get_user_model
        from channels.db import database_sync_to_async
        from urllib.parse import parse_qs

        # Get token from query string
        query_string = self.scope['query_string'].decode()
        query_params = parse_qs(query_string)
        token = query_params.get('token', [None])[0]

        if not token:
            print("DEBUG: No token provided, closing.")
            await self.close()
            return

        try:
            # Verify token
            UntypedToken(token)
            # Get user from token
            from rest_framework_simplejwt.authentication import JWTAuthentication
            validated_token = JWTAuthentication().get_validated_token(token)
            user_id = validated_token['user_id']
            self.user = await database_sync_to_async(get_user_model().objects.get)(id=user_id)
            print(f"DEBUG: User {self.user} connected.")
        except (InvalidToken, TokenError, get_user_model().DoesNotExist) as e:
            print(f"DEBUG: Auth failed: {e}")
            await self.close()
            return

        self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]
        self.room_group_name = f"chat_{self.chat_id}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        print(f"DEBUG: Socket Accepted for room {self.room_group_name}")

    async def disconnect(self, close_code):
        print(f"DEBUG: Disconnect {close_code}")
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        print(f"DEBUG: Receive: {text_data}")
        data = json.loads(text_data)
        message = data.get("message")

        if not message:
            return

        try:
            msg = await self.save_message(message)
            print(f"DEBUG: Message saved {msg.id}")

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "id": msg.id,
                    "message": msg.content,
                    "sender": str(msg.sender),
                    "timestamp": msg.created_at.isoformat(),
                }
            )
            print("DEBUG: Group send complete")
        except Exception as e:
            print(f"DEBUG: Error in receive: {e}")

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    @database_sync_to_async
    def save_message(self, content):
        chat = Chat.objects.get(id=self.chat_id)
        return Message.objects.create(
            chat=chat,
            sender=self.user,
            content=content
        )
