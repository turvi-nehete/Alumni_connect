from django.contrib import admin
from .models import AlumniLocation


@admin.register(AlumniLocation)
class AlumniLocationAdmin(admin.ModelAdmin):
    list_display = ("alumni", "city", "country")
    list_filter = ("country",)
