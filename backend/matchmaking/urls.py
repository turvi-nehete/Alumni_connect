from django.urls import path
from .views import UserMatchmakingView, RecalculateMatchesView, JobRecommendationView, ContextualAlumniView

urlpatterns = [
    path("recommendations/", UserMatchmakingView.as_view()),
    path("alumni/", ContextualAlumniView.as_view()),
    path("jobs/", JobRecommendationView.as_view()),
    path("recalculate/", RecalculateMatchesView.as_view()),
]
