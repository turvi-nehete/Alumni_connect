from django.contrib import admin
from .models import MatchScore


@admin.register(MatchScore)
class MatchScoreAdmin(admin.ModelAdmin):
    list_display = ("student", "alumni", "score", "created_at")
    list_filter = ("score",)
