from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.db import transaction

from .models import MatchScore
from .serializers import MatchScoreSerializer
from .engine import compute_similarity
from profiles.models import Skill, UserSkill
from accounts.models import User


class RecommendAlumniView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != "student":
            return Response(
                {"error": "Only students can access recommendations"},
                status=status.HTTP_403_FORBIDDEN
            )

        matches = MatchScore.objects.filter(student=request.user)[:10]
        serializer = MatchScoreSerializer(matches, many=True)
        return Response(serializer.data)


class RecalculateMatchesView(APIView):
    """
    Can be triggered by admin or during demo.
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
                student_skills = Skill.objects.filter(
                    userskill__user=student
                ).values_list("id", flat=True)

                for alum in alumni:
                    alumni_skills = Skill.objects.filter(
                        userskill__user=alum
                    ).values_list("id", flat=True)

                    score = compute_similarity(
                        student_skills,
                        alumni_skills
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
