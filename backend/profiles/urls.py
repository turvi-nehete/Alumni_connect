from django.urls import path
from .views import MyProfileView, ProfileListView

urlpatterns = [
    path('me/', MyProfileView.as_view(), name='my-profile'),
    path('all/', ProfileListView.as_view(), name='all-profiles'),
]
