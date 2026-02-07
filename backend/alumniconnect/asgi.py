import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "alumniconnect.settings")

# Initialize Django ASGI application early to ensure the AppRegistry is populated
# before importing code that may import ORM models.
django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import alumniconnect.routing

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter(
            alumniconnect.routing.websocket_urlpatterns
        )
    ),
    "http": django_asgi_app,
})

