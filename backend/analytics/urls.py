from django.urls import path
from .views import AlumniHeatmapView, EngagementStatsView

urlpatterns = [
    path("heatmap/", AlumniHeatmapView.as_view()),
    path("stats/", EngagementStatsView.as_view()),
]
