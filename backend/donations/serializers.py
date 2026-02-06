from rest_framework import serializers
from .models import Donation


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ["id", "amount", "is_anonymous", "created_at"]


class CreateDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ["amount", "is_anonymous"]
