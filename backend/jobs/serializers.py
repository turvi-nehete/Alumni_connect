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

    class Meta:
        model = Job
        fields = "__all__"


class JobCreateSerializer(serializers.ModelSerializer):
    skill_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True
    )

    class Meta:
        model = Job
        fields = ["title", "description", "company", "expiry_date", "skill_ids"]

    def create(self, validated_data):
        skill_ids = validated_data.pop("skill_ids")
        job = Job.objects.create(**validated_data)
        job.skills.set(Skill.objects.filter(id__in=skill_ids))
        return job


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = "__all__"
