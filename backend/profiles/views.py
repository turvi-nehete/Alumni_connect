# import profile
# from django.shortcuts import render

# # Create your views here.
# from rest_framework import generics, permissions
# from .models import Profile
# from .serializers import ProfileSerializer


# class MyProfileView(generics.RetrieveUpdateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = ProfileSerializer

#     def get_object(self):
#         profile, created = Profile.objects.get_or_create(
#             user=self.request.user
#         )
#         return profile

#     def perform_update(self, serializer):
#         serializer.save(user=self.request.user)

from rest_framework import generics, permissions
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



