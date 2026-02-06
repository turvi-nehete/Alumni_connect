from django.urls import path
from .views import MyChatsView, CreateChatView, ChatMessagesView

urlpatterns = [
    path("my/", MyChatsView.as_view()),
    path("create/", CreateChatView.as_view()),
    path("<int:chat_id>/messages/", ChatMessagesView.as_view()),
]
