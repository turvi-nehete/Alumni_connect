from rest_framework import serializers
from .models import Job, JobApplication
from profiles.models import Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name"]


class JobSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    posted_by = serializers.StringRelatedField()
    has_applied = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = "__all__"

    def get_has_applied(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.applications.filter(student=request.user).exists()
        return False


class JobCreateSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Job
        fields = ["title", "description", "company", "expiry_date", "skills"]

    def create(self, validated_data):
        skills_data = validated_data.pop("skills", [])
        job = Job.objects.create(**validated_data)
        
        # Create/Get skills and add to job
        for skill_name in skills_data:
            skill_obj, _ = Skill.objects.get_or_create(
                name=skill_name.strip().lower()
            )
            job.skills.add(skill_obj)
            
        return job


class JobApplicationSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    student_email = serializers.CharField(source="student.email", read_only=True)
    job_title = serializers.CharField(source="job.title", read_only=True)

    class Meta:
        model = JobApplication
        fields = ["id", "job", "job_title", "student", "student_name", "student_email", "status", "applied_at"]

    def get_student_name(self, obj):
        if obj.student.first_name:
            return f"{obj.student.first_name} {obj.student.last_name}"
        return obj.student.email
