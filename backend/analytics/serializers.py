from rest_framework import serializers
from .models import AlumniLocation


class AlumniLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniLocation
        fields = ["latitude", "longitude", "city", "country"]
