from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.http import HttpResponse

@api_view(['GET'])
@permission_classes([AllowAny])  # Allow unauthenticated access to root
def root_view(request):
    return Response({"message": "Welcome to the Hospital Operating System API"})

def favicon_view(request):
    return HttpResponse(status=204)