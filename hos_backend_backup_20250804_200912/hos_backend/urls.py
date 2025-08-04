from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import root_view, favicon_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', root_view, name='root'),
    path('favicon.ico', favicon_view, name='favicon'),
    path('admin/', admin.site.urls),
    path('api/patients/', include('patients.urls')),
    path('api/staff/', include('staff.urls')),
    path('api/appointments/', include('appointments.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)