from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Donation(models.Model):
    donor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="donations"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        name = "Anonymous" if self.is_anonymous else str(self.donor)
        return f"{name} donated {self.amount}"


class DonationLedger(models.Model):
    donation = models.OneToOneField(
        Donation,
        on_delete=models.PROTECT,
        related_name="ledger"
    )
    hash = models.CharField(max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ledger entry for Donation {self.donation.id}"
