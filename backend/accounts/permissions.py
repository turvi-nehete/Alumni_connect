from rest_framework.permissions import BasePermission

class IsAlumni(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'alumni'


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'student'


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'
