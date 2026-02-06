from django.contrib import admin
from .models import Donation, DonationLedger


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ("id", "donor", "amount", "is_anonymous", "created_at")


@admin.register(DonationLedger)
class DonationLedgerAdmin(admin.ModelAdmin):
    list_display = ("donation", "hash", "created_at")
