from django.urls import path
from .views import RecommendAlumniView, RecalculateMatchesView

urlpatterns = [
    path("recommendations/", RecommendAlumniView.as_view()),
    path("recalculate/", RecalculateMatchesView.as_view()),
]
