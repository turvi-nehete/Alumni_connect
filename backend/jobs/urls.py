from django.urls import path
from .views import (
    ListJobsView,
    PostJobView,
    ApplyJobView,
    RecommendedJobsView,
    MyAppliedJobsView,
    JobApplicantsView
)

urlpatterns = [
    path("", ListJobsView.as_view()),
    path("post/", PostJobView.as_view()),
    path("<int:job_id>/apply/", ApplyJobView.as_view()),
    path("recommended/", RecommendedJobsView.as_view()),
    path("my-applications/", MyAppliedJobsView.as_view()),
    path("<int:job_id>/applicants/", JobApplicantsView.as_view()),
]
