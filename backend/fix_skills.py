import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alumniconnect.settings')
django.setup()

from profiles.models import Skill, Profile
from jobs.models import Job

def fix_skills():
    print("Starting Skill Merge...")
    all_skills = Skill.objects.all()
    
    # Group by lowercase name
    skill_map = {}
    for s in all_skills:
        key = s.name.strip().lower()
        if key not in skill_map:
            skill_map[key] = []
        skill_map[key].append(s)
        
    for key, skills in skill_map.items():
        if len(skills) > 1:
            print(f"fixing duplicate: {key} -> {[s.name for s in skills]}")
            
            # Prefer Title Case if available, else first one
            # Sort by name (reverse) so "React" comes before "react" usually (ASCII R < r.. wait. R=82, r=114. )
            # Actually, let's just pick the one that looks "nicer" (e.g. capitalized)
            skills.sort(key=lambda x: x.name[0].islower()) # False (upper) first
            
            keep_skill = skills[0]
            remove_skills = skills[1:]
            
            print(f"Keeping: {keep_skill.name} (ID: {keep_skill.id})")
            
            for remove_skill in remove_skills:
                print(f"  Merging {remove_skill.name} (ID: {remove_skill.id})...")
                
                # Update Profiles
                profiles = Profile.objects.filter(skills=remove_skill)
                for p in profiles:
                    p.skills.remove(remove_skill)
                    p.skills.add(keep_skill)
                    
                # Update Jobs
                jobs = Job.objects.filter(skills=remove_skill)
                for j in jobs:
                    j.skills.remove(remove_skill)
                    j.skills.add(keep_skill)
                    
                remove_skill.delete()
                print("  Deleted.")
                
    print("Skill Merge Complete.")
    
def populate_jobs():
    # Fix the Python Engineer job manually for testing
    try:
        py_job = Job.objects.filter(title__icontains="Python").first()
        if py_job:
            # Get normalized Python skill
            py_skill = Skill.objects.get(name__iexact="Python")
            py_job.skills.add(py_skill)
            print(f"Added {py_skill.name} to {py_job.title}")
            
            # Add AWS if exists
            aws_skill = Skill.objects.filter(name__iexact="AWS").first()
            if aws_skill:
                py_job.skills.add(aws_skill)
                print(f"Added {aws_skill.name} to {py_job.title}")
    except Exception as e:
        print(f"Error populating job: {e}")

if __name__ == "__main__":
    fix_skills()
    populate_jobs()
