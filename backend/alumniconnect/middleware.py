import logging
import traceback
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class Json500Middleware:
    """
    Middleware to catch ALL unhandled exceptions in /api/ routes
    and return a JSON response instead of Django's default HTML 500 page.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_exception(self, request, exception):
        # Check if the request is for an API route
        if request.path.startswith('/api/'):
            # Log the full error to the console (Render logs)
            logger.error(f"CRITICAL API ERROR at {request.path}: {exception}")
            logger.error(traceback.format_exc())
            
            # Return JSON response
            return JsonResponse({
                "error": "Internal Server Error",
                "message": "Something went wrong on the server.",
                "detail": str(exception)  # Exposing detail for debugging (Safe for this context)
            }, status=500)
        
        # for non-api routes, let Django return standard HTML
        return None
