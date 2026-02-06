from django.urls import path
from .views import CreateEventView, EventListView, RSVPView, EventRSVPListView, EventDetailView

urlpatterns = [
    path('', EventListView.as_view()),
    path('<int:pk>/', EventDetailView.as_view()),
    path('create/', CreateEventView.as_view()),
    path('rsvp/', RSVPView.as_view()),
    path('<int:event_id>/rsvps/', EventRSVPListView.as_view()),

]
