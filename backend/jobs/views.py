from rest_framework import generics
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


class ListJobsView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = JobSerializer
    queryset = Job.objects.all().order_by("-created_at")


class PostJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role not in ["alumni", "admin"]:
            return Response(
                {"error": "Only alumni and admins can post jobs"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = JobCreateSerializer(data=request.data)

        if serializer.is_valid():
            job = serializer.save(posted_by=request.user)

            # Optional: Notify students matching skills could go here
            Notification.objects.create(
                user=request.user,
                message=f"Job '{job.title}' posted successfully."
            )

            return Response(
                JobSerializer(job, context={'request': request}).data,
                status=status.HTTP_201_CREATED
            )

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

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
             return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

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
             # If not student, maybe return random or recent? 
             # For now keep as recent for others
             jobs = Job.objects.all().order_by("-created_at")[:5]
             serializer = JobSerializer(jobs, many=True, context={'request': request})
             return Response(serializer.data)

        profile = getattr(request.user, 'profile', None)
        if not profile:
             jobs = Job.objects.all().order_by("-created_at")[:5]
             serializer = JobSerializer(jobs, many=True, context={'request': request})
             return Response(serializer.data)
            
        student_skills = profile.skills.all()

        jobs = Job.objects.all()
        recommended = recommend_jobs(student_skills, jobs)

        serializer = JobSerializer(recommended, many=True, context={'request': request})
        return Response(serializer.data)


class MyAppliedJobsView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(student=self.request.user).order_by("-applied_at")


class JobApplicantsView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        # Ensure user owns the job or is admin
        return JobApplication.objects.filter(job_id=job_id).order_by("-applied_at")

    def list(self, request, *args, **kwargs):
        job_id = self.kwargs['job_id']
        try:
            job = Job.objects.get(id=job_id)
            if request.user != job.posted_by and request.user.role != 'admin':
                return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        except Job.DoesNotExist:
            return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return super().list(request, *args, **kwargs)
