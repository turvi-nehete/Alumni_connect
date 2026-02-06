from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from notifications.models import Notification


from .models import Job, JobApplication
from .serializers import (
    JobSerializer,
    JobCreateSerializer,
    JobApplicationSerializer
)
from profiles.models import Skill
from .recommender import recommend_jobs


class ListJobsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        jobs = Job.objects.all().order_by("-created_at")
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)


class PostJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "alumni":
            return Response(
                {"error": "Only alumni can post jobs"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = JobCreateSerializer(data=request.data)

        if serializer.is_valid():
            job = serializer.save(posted_by=request.user)

            Notification.objects.create(
                user=request.user,
                message=f"Job '{job.title}' posted successfully."
            )

            return Response(
                JobSerializer(job).data,
                status=status.HTTP_201_CREATED
            )

        # 🔴 THIS WAS MISSING
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )



class ApplyJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, job_id):
        if request.user.role != "student":
            return Response(
                {"error": "Only students can apply"},
                status=status.HTTP_403_FORBIDDEN
            )

        job = Job.objects.get(id=job_id)

        application, created = JobApplication.objects.get_or_create(
            job=job,
            student=request.user
        )

        if not created:
            return Response(
                {"error": "Already applied"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            JobApplicationSerializer(application).data,
            status=status.HTTP_201_CREATED
        )


class RecommendedJobsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "student":
            return Response(
                {"error": "Only students can view recommendations"},
                status=status.HTTP_403_FORBIDDEN
            )

        profile = request.user.profile
        student_skills = profile.skills.all()

        jobs = Job.objects.all()
        recommended = recommend_jobs(student_skills, jobs)

        serializer = JobSerializer(recommended, many=True)
        return Response(serializer.data)
