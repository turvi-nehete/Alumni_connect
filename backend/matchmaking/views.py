from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.db import transaction

from accounts.models import User
from .models import MatchScore
from .serializers import MatchScoreSerializer
from .engine import compute_similarity


class RecommendAlumniView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Only students can see recommendations
        if request.user.role != "student":
            return Response(
                {"error": "Only students can view recommendations"},
                status=status.HTTP_403_FORBIDDEN
            )

        matches = MatchScore.objects.filter(
            student=request.user
        ).order_by("-score")[:10]

        serializer = MatchScoreSerializer(matches, many=True)
        return Response(serializer.data)


class RecalculateMatchesView(APIView):
    """
    Recomputes all student–alumni match scores.
    Intended for admin use or demo trigger.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "admin":
            return Response(
                {"error": "Admin only"},
                status=status.HTTP_403_FORBIDDEN
            )

        students = User.objects.filter(role="student")
        alumni = User.objects.filter(role="alumni")

        with transaction.atomic():
            MatchScore.objects.all().delete()

            for student in students:
                # ✅ Correct: ManyToMany via Profile
                student_skill_ids = student.profile.skills.values_list(
                    "id", flat=True
                )

                for alum in alumni:
                    alumni_skill_ids = alum.profile.skills.values_list(
                        "id", flat=True
                    )

                    score = compute_similarity(
                        student_skill_ids,
                        alumni_skill_ids
                    )

                    if score > 0:
                        MatchScore.objects.create(
                            student=student,
                            alumni=alum,
                            score=score
                        )

        return Response(
            {"message": "Matchmaking recalculated successfully"}
        )

