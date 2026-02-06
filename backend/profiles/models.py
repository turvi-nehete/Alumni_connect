# from django.db import models

# # Create your models here.
# from django.db import models
# from django.conf import settings

# User = settings.AUTH_USER_MODEL


# class Skill(models.Model):
#     name = models.CharField(max_length=100, unique=True)

#     def __str__(self):
#         return self.name


# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
    
#     bio = models.TextField(blank=True)
#     company = models.CharField(max_length=255, blank=True)
#     location = models.CharField(max_length=255, blank=True)
#     linkedin = models.URLField(blank=True)

#     skills = models.ManyToManyField(Skill, blank=True)

#     def __str__(self):
#         return f"{self.user.email}'s profile"


# from rest_framework import serializers
# from .models import Profile, Skill


# class ProfileSerializer(serializers.ModelSerializer):

#     # Accept list of strings
#     skills = serializers.ListField(
#         child=serializers.CharField(),
#         write_only=True
#     )

#     # Return readable skills
#     skill_names = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = Profile
#         fields = [
#             "bio",
#             "company",
#             "location",
#             "linkedin",
#             "skills",
#             "skill_names",
#         ]

#     def get_skill_names(self, obj):
#         return [skill.name for skill in obj.skills.all()]

#     def create(self, validated_data):
#         skills_data = validated_data.pop("skills", [])
#         profile = Profile.objects.create(**validated_data)

#         self._handle_skills(profile, skills_data)

#         return profile

#     def update(self, instance, validated_data):
#         skills_data = validated_data.pop("skills", None)

#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)

#         instance.save()

#         if skills_data is not None:
#             instance.skills.clear()
#             self._handle_skills(instance, skills_data)

#         return instance

#     def _handle_skills(self, profile, skills_data):
#         """
#         Creates skills if they don't exist
#         and attaches them to the profile.
#         """

#         for skill_name in skills_data:
#             skill_obj, _ = Skill.objects.get_or_create(
#                 name=skill_name.strip().lower()
#             )
#             profile.skills.add(skill_obj)


from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Skill(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        db_index=True
    )

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    bio = models.TextField(blank=True)
    company = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True)
    linkedin = models.URLField(blank=True)

    skills = models.ManyToManyField(
        Skill,
        blank=True,
        related_name="profiles"
    )

    def __str__(self):
        return f"{self.user}'s profile"
