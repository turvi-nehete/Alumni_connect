from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Sum

from .models import Donation, DonationLedger
from .serializers import DonationSerializer, CreateDonationSerializer
from .ledger import generate_ledger_hash


class CreateDonationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateDonationSerializer(data=request.data)
        if serializer.is_valid():
            donation = serializer.save(
                donor=request.user
            )

            ledger_hash = generate_ledger_hash(donation)
            DonationLedger.objects.create(
                donation=donation,
                hash=ledger_hash
            )

            return Response(
                DonationSerializer(donation).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DonationStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total = Donation.objects.aggregate(
            total_amount=Sum("amount")
        )["total_amount"] or 0

        count = Donation.objects.count()

        return Response({
            "total_collected": total,
            "total_donations": count
        })


class MyDonationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        donations = Donation.objects.filter(donor=request.user)
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data)
