from rest_framework import serializers
from .models import MentorshipSlot, MentorshipSession


class MentorshipSlotSerializer(serializers.ModelSerializer):
    alumni = serializers.StringRelatedField()

    class Meta:
        model = MentorshipSlot
        fields = "__all__"


class CreateSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorshipSlot
        fields = ["start_time", "end_time"]


class MentorshipSessionSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField()
    alumni = serializers.SerializerMethodField()

    class Meta:
        model = MentorshipSession
        fields = "__all__"

    def get_alumni(self, obj):
        return str(obj.slot.alumni)
