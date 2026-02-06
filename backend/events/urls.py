from django.urls import path
from .views import CreateEventView, EventListView, RSVPView

urlpatterns = [
    path('', EventListView.as_view()),
    path('create/', CreateEventView.as_view()),
    path('rsvp/', RSVPView.as_view()),
]
