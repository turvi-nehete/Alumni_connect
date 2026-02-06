from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.db import transaction

from accounts.models import User
from .models import MatchScore
from .serializers import MatchScoreSerializer
from .engine import compute_similarity


class UserMatchmakingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # 1. Determine Target Group
        if user.role == "student":
            target_role = "alumni"
            target_users = User.objects.filter(role="alumni")
        elif user.role == "alumni":
            target_role = "student"
            target_users = User.objects.filter(role="student")
        else:
             return Response([])

        # 2. Get Current User Skills
        if not hasattr(user, 'profile'):
             return Response([])
             
        user_skill_ids = list(user.profile.skills.values_list("id", flat=True))
        if not user_skill_ids:
             return Response([])

        # 3. Compute Scores On-The-Fly
        # (For MVP with small user base, this is fine to do in-request)
        matches = []
        for target in target_users:
            # Skip if no profile/skills
            if not hasattr(target, 'profile'):
                continue
                
            target_skill_ids = list(target.profile.skills.values_list("id", flat=True))
            
            score = compute_similarity(user_skill_ids, target_skill_ids)
            
            if score > 0:
                matches.append({
                    "id": target.id,
                    "name": f"{target.first_name} {target.last_name}",
                    "role": target.role,
                    "score": round(score * 100),
                    "skills": [s.name for s in target.profile.skills.all()[:3]],
                    "company": target.profile.company,
                    "department": target.profile.department
                })
        
        # 4. Sort and Return
        matches.sort(key=lambda x: x['score'], reverse=True)
        matches.sort(key=lambda x: x['score'], reverse=True)
        return Response(matches[:10])


from .contextual import get_contextual_matches

class ContextualAlumniView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        matches = get_contextual_matches(request.user)
        return Response(matches)


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

from jobs.models import Job

class JobRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # 1. Get User Skills
        if not hasattr(user, 'profile'):
            return Response([])
            
        user_skill_ids = list(user.profile.skills.values_list("id", flat=True))
        
        if not user_skill_ids:
             return Response([])

        # 2. Iterate all Jobs and score them
        recommended_jobs = []
        jobs = Job.objects.all() # In production, filter by active/expiry
        
        for job in jobs:
            job_skill_ids = list(job.skills.values_list("id", flat=True))
            
            score = compute_similarity(user_skill_ids, job_skill_ids)
            
            if score > 0:
                recommended_jobs.append({
                    "id": job.id,
                    "title": job.title,
                    "company": job.company,
                    "location": "Remote", # Placeholder or add to model
                    "type": "Full-time", # Placeholder
                    "match_score": round(score * 100), # Percentage
                    "skills_matched": len(set(user_skill_ids) & set(job_skill_ids))
                })
        
        # 3. Sort by Score
        recommended_jobs.sort(key=lambda x: x['match_score'], reverse=True)
        
        return Response(recommended_jobs[:5])
