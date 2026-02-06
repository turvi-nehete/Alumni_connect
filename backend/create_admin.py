import os
import django
from django.conf import settings

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'alumniconnect.settings')
django.setup()

from accounts.models import User

def create_admin_user():
    email = 'admin@example.com'
    password = 'password123'
    first_name = 'Admin'
    last_name = 'User'
    
    # Check if user exists
    if User.objects.filter(email=email).exists():
        print(f"User {email} already exists.")
        user = User.objects.get(email=email)
        # Update user to be admin
        user.role = 'admin'
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()
        print(f"Updated {email} to be an admin with password '{password}'")
    else:
        user = User.objects.create_superuser(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role='admin'
        )
        print(f"Created admin user: {email} / {password}")

if __name__ == '__main__':
    create_admin_user()
