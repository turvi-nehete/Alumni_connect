from rest_framework import generics, permissions, filters
from .models import Profile
from .serializers import ProfileSerializer


class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(
            user=self.request.user
        )
        return profile


class ProfileListView(generics.ListAPIView):
    # Retrieve all profiles
    queryset = Profile.objects.all().order_by('?') 
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    # Optional: Add search
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__first_name', 'user__last_name', 'company', 'skills__name']
