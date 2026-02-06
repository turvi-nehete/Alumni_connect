from django.db.models import Q
from django.contrib.auth import get_user_model
from profiles.models import Profile

User = get_user_model()

def get_contextual_matches(user, limit=5):
    """
    Returns a list of alumni who share context with the user.
    Context includes:
    1. Same Company
    2. Batch +/- 2 years
    3. Same Location
    4. Shared Skills (Jaccard > 0)
    """
    if not hasattr(user, 'profile'):
        return []

    profile = user.profile
    matches = []
    
    # Base Query: All Alumni (excluding self)
    # If user is alumni, can match students too? User said "Alumni-Alumni", 
    # but let's keep it broad: other users who are NOT the requester.
    candidates = User.objects.exclude(id=user.id).select_related('profile')

    # Prefetch skills for performance if possible, but for now simple loop is okay for MVP
    
    user_skills = set(profile.skills.values_list('name', flat=True))
    user_grad_year = int(profile.graduation_year) if profile.graduation_year and profile.graduation_year.isdigit() else None
    
    scored_candidates = []

    for candidate in candidates:
        if not hasattr(candidate, 'profile'):
            continue
            
        c_profile = candidate.profile
        score = 0
        reasons = []

        # 1. Company Match (High weights)
        if profile.company and c_profile.company and profile.company.strip().lower() == c_profile.company.strip().lower():
            score += 30
            reasons.append("Same Company")

        # 2. Batch Proximity (High weights)
        if user_grad_year and c_profile.graduation_year and c_profile.graduation_year.isdigit():
            c_year = int(c_profile.graduation_year)
            diff = abs(user_grad_year - c_year)
            if diff == 0:
                score += 25
                reasons.append("Same Batch")
            elif diff <= 2:
                score += 15
                reasons.append(f"Batch '{c_year}")

        # 3. Location Match
        if profile.location and c_profile.location and profile.location.strip().lower() == c_profile.location.strip().lower():
            score += 10
            reasons.append("Same City")

        # 4. Skills Match
        c_skills = set(c_profile.skills.values_list('name', flat=True))
        shared_skills = user_skills.intersection(c_skills)
        if shared_skills:
            skill_score = len(shared_skills) * 5 # 5 points per shared skill
            score += skill_score
            reasons.append(f"{len(shared_skills)} Shared Skills")

        if score > 0:
            scored_candidates.append({
                "id": candidate.id,
                "name": f"{candidate.first_name} {candidate.last_name}".strip(),
                "role": candidate.role,
                "company": c_profile.company,
                "score": score,
                "reasons": reasons[:2], # Top 2 reasons
                "avatar": f"https://api.dicebear.com/7.x/initials/svg?seed={candidate.first_name}"
            })

    # Sort by score DESC
    scored_candidates.sort(key=lambda x: x['score'], reverse=True)
    
    return scored_candidates[:limit]
