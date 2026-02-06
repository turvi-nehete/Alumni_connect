from django.contrib import admin
from .models import MentorshipSlot, MentorshipSession


@admin.register(MentorshipSlot)
class MentorshipSlotAdmin(admin.ModelAdmin):
    list_display = ("alumni", "start_time", "end_time", "is_booked")


@admin.register(MentorshipSession)
class MentorshipSessionAdmin(admin.ModelAdmin):
    list_display = ("student", "slot", "booked_at")
