from django.urls import path
from .views import AlumniHeatmapView, EngagementStatsView, DashboardView, JobPopularityView

urlpatterns = [
    path("heatmap/", AlumniHeatmapView.as_view()),
    path("stats/", EngagementStatsView.as_view()),
    path("active-jobs/", JobPopularityView.as_view()),
    path("dashboard/", DashboardView.as_view()),
]
