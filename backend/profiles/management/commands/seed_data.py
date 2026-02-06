from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from profiles.models import Profile, Skill
from messaging.models import Chat, Message
from events.models import Event
from jobs.models import Job
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # 1. Create Skills
        skills_list = ['React', 'Python', 'Django', 'JavaScript', 'Node.js', 'Machine Learning', 'Data Science', 'AWS', 'Docker', 'Kubernetes']
        skills = []
        for name in skills_list:
            skill, _ = Skill.objects.get_or_create(name=name)
            skills.append(skill)
            
        # 2. Create Users & Profiles
        users_data = [
            {'email': 'riya@example.com', 'first_name': 'Riya', 'last_name': 'Shah', 'role': 'alumni', 'company': 'Google', 'skills': ['React', 'JavaScript', 'AWS']},
            {'email': 'kabir@example.com', 'first_name': 'Kabir', 'last_name': 'Patel', 'role': 'student', 'company': 'Student', 'skills': ['Python', 'Django']},
            {'email': 'neha@example.com', 'first_name': 'Neha', 'last_name': 'Jain', 'role': 'alumni', 'company': 'Microsoft', 'skills': ['Node.js', 'Docker']},
            {'email': 'aarav@example.com', 'first_name': 'Aarav', 'last_name': 'Mehta', 'role': 'student', 'company': 'Student', 'skills': ['Machine Learning', 'Data Science']},
        ]
        
        created_users = []
        for data in users_data:
            user, created = User.objects.get_or_create(email=data['email'], defaults={
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'role': data['role']
            })
            if created:
                user.set_password('password123')
                user.save()
            
            profile, _ = Profile.objects.get_or_create(user=user)
            profile.company = data['company']
            profile.save()
            
            # Add skills
            for skill_name in data['skills']:
                skill = Skill.objects.get(name=skill_name)
                profile.skills.add(skill)
                
            created_users.append(user)
            
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(created_users)} users with profiles and skills.'))
