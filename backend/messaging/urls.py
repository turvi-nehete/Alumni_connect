from django.urls import path
from .views import MyChatsView, CreateChatView, ChatMessagesView, DeleteMessageView
from .views import send_message

urlpatterns = [
    path("my-chats/", MyChatsView.as_view()),
    path("create-chat/", CreateChatView.as_view()),
    path("chat/<int:chat_id>/messages/", ChatMessagesView.as_view()),
    path("message/<int:message_id>/delete/", DeleteMessageView.as_view()),
    path("chat/<int:chat_id>/send/", send_message),

]
