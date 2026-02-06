from django.urls import path
from .views import CreateDonationView, DonationStatsView, MyDonationsView

urlpatterns = [
    path("", CreateDonationView.as_view()),
    path("stats/", DonationStatsView.as_view()),
    path("mine/", MyDonationsView.as_view()),
]
