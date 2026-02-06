from rest_framework import serializers
from .models import MatchScore


class MatchScoreSerializer(serializers.ModelSerializer):
    alumni_name = serializers.SerializerMethodField()
    alumni_company = serializers.SerializerMethodField()

    class Meta:
        model = MatchScore
        fields = ["alumni", "alumni_name", "alumni_company", "score"]

    def get_alumni_name(self, obj):
        return str(obj.alumni)

    def get_alumni_company(self, obj):
        profile = getattr(obj.alumni, "profile", None)
        return getattr(profile, "company", None)
