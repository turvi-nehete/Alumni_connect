import hashlib


def generate_ledger_hash(donation):
    """
    Generates a tamper-evident hash for a donation.
    """
    payload = f"{donation.id}{donation.amount}{donation.created_at}"
    return hashlib.sha256(payload.encode()).hexdigest()
