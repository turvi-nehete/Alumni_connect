from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/profiles/', include('profiles.urls')),
    path('api/matchmaking/', include('matchmaking.urls')),
    path('api/mentorship/', include('mentorship.urls')),
    path('api/jobs/', include('jobs.urls')),
    path('api/events/', include('events.urls')),
    path('api/achievements/', include('achievements.urls')),
    path('api/donations/', include('donations.urls')),
    path('api/messaging/', include('messaging.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/analytics/', include('analytics.urls')),
]

try:
    urlpatterns.append(path("api/chatbot/", include("chatbot.urls")))
except Exception:
    pass

# Serve React Frontend (Catch-all)
# This must be the last pattern
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))
]
