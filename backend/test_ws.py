import asyncio
import websockets
import django
import os
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alumniconnect.settings')
django.setup()

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

async def test_connection(token):
    # Assuming chat_id 1 exists (from seed)
    uri = f"ws://127.0.0.1:8000/ws/chat/1/?token={token}"
    print(f"Connecting to {uri}...")
    
    try:
        async with websockets.connect(uri) as websocket:
            print("Connected successfully!")
            await websocket.send('{"message": "Hello from test script"}')
            print("Sent message")
            response = await websocket.recv()
            print(f"Received: {response}")
    except Exception as e:
        print(f"Connection failed: {e}")

if __name__ == "__main__":
    # Get a valid user and token synchronously
    user = User.objects.first()
    if not user:
        print("No users found!")
    else:
        refresh = RefreshToken.for_user(user)
        token = str(refresh.access_token)
        asyncio.run(test_connection(token))
