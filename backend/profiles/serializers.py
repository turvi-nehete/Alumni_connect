from rest_framework import serializers
from .models import Profile, Skill


class ProfileSerializer(serializers.ModelSerializer):

    # Accept strings from frontend
    skills = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    # Return readable skills
    skill_names = serializers.SerializerMethodField(read_only=True)

    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    role = serializers.CharField(source='user.role', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = Profile
        fields = [
            "user_id",
            "first_name",
            "last_name",
            "email",
            "role",
            "bio",
            "company",
            "location",
            "linkedin",
            "graduation_year",
            "department",
            "skills",
            "skill_names",
        ]

    def get_skill_names(self, obj):
        return [skill.name for skill in obj.skills.all()]

    # ⭐ CORE LOGIC
    def _handle_skills(self, profile, skills_data):

        skill_objects = []

        for skill_name in skills_data:
            skill_name = skill_name.strip().lower()

            skill_obj, _ = Skill.objects.get_or_create(
                name=skill_name
            )

            skill_objects.append(skill_obj)

        # replaces old skills safely
        profile.skills.set(skill_objects)

    def update(self, instance, validated_data):

        skills_data = validated_data.pop("skills", None)

        # update profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if skills_data is not None:
            self._handle_skills(instance, skills_data)

        return instance
