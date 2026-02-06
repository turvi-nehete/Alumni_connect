from django.urls import path
from .views import (
    CreateSlotView,
    ListAvailableSlotsView,
    BookSlotView,
    MyMentorshipSessionsView
)

urlpatterns = [
    path("slots/", ListAvailableSlotsView.as_view()),
    path("slots/create/", CreateSlotView.as_view()),
    path("slots/<int:slot_id>/book/", BookSlotView.as_view()),
    path("sessions/", MyMentorshipSessionsView.as_view()),
]

