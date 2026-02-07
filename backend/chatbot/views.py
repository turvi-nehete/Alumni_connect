import base64
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from openai import OpenAI
from .services import chatbot_brain

# client = OpenAI()  <-- specific removal to lazy load


class ChatbotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get("text")
        audio = request.FILES.get("audio")

        # 🎤 Voice → Text
        if audio:
            try:
                client = OpenAI() # Lazy init
                transcription = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio
                )
                text = transcription.text
            except Exception as e:
                return Response({"error": f"Voice processing failed: {str(e)}"}, status=500)

        if not text:
            return Response(
                {"error": "Text or audio is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 🧠 GPT Brain
        reply_text = chatbot_brain(
            text,
            user_context={
                "role": request.user.role,
                "email": request.user.email
            }
        )

        # 🔊 Text → Speech
        try:
            client = OpenAI() # Lazy init
            speech = client.audio.speech.create(
                model="gpt-4o-mini-tts",
                voice="alloy",
                input=reply_text
            )
        except Exception:
            # Fallback if TTS fails (e.g. no key) - just return text without audio
            speech = None

        audio_base64 = base64.b64encode(speech.read()).decode() if speech else None

        return Response({
            "user_text": text,
            "reply_text": reply_text,
            "reply_audio_base64": audio_base64
        })
