from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Achievement
from .serializers import AchievementSerializer


class AchievementCreateView(generics.CreateAPIView):

    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MyAchievementsView(generics.ListAPIView):

    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Achievement.objects.filter(
            user=self.request.user
        ).order_by('-date')

class AchievementDeleteView(generics.DestroyAPIView):

    permission_classes = [permissions.IsAuthenticated]
    queryset = Achievement.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
