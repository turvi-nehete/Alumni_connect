import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alumniconnect.settings')
django.setup()

from django.contrib.auth import get_user_model
from profiles.models import Profile, Skill
from jobs.models import Job
from matchmaking.engine import compute_similarity

User = get_user_model()

print("=== SKILLS ===")
for s in Skill.objects.all():
    print(f"ID: {s.id}, Name: '{s.name}'")

print("\n=== USERS & SKILLS ===")
for u in User.objects.all():
    try:
        profile = u.profile
        skills = list(profile.skills.all())
        skill_names = [f"{s.name} ({s.id})" for s in skills]
        print(f"User: {u.email} ({u.role}) | Skills: {skill_names}")
    except Exception as e:
        print(f"User: {u.email} ({u.role}) | Profile Error: {e}")

print("\n=== JOBS & SKILLS ===")
for j in Job.objects.all():
    skills = list(j.skills.all())
    skill_names = [f"{s.name} ({s.id})" for s in skills]
    print(f"Job: {j.title} | Posted By: {j.posted_by} | Skills: {skill_names}")

print("\n=== MANUAL MATCH CHECK ===")
# Try to match the first student with first alumni
students = User.objects.filter(role="student")
alumni = User.objects.filter(role="alumni")

if students.exists() and alumni.exists():
    stu = students.first()
    alu = alumni.first()
    
    if hasattr(stu, 'profile') and hasattr(alu, 'profile'):
        stu_ids = list(stu.profile.skills.values_list("id", flat=True))
        alu_ids = list(alu.profile.skills.values_list("id", flat=True))
        
        score = compute_similarity(stu_ids, alu_ids)
        print(f"Match {stu.email} <-> {alu.email}")
        print(f"Student IDs: {stu_ids}")
        print(f"Alumni IDs: {alu_ids}")
        print(f"Score: {score}")
    else:
        print("Profiles missing for match check.")
else:
    print("Need both student and alumni to check match.")
