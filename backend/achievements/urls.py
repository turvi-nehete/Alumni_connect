from django.urls import path
from .views import (
    AchievementCreateView,
    MyAchievementsView,
    AchievementDeleteView
)

urlpatterns = [
    path('', MyAchievementsView.as_view()),
    path('create/', AchievementCreateView.as_view()),
    path('<int:pk>/delete/', AchievementDeleteView.as_view()),
]
