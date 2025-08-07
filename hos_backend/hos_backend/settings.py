from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# Security: Use a secure SECRET_KEY or generate a new one
SECRET_KEY = config('SECRET_KEY', default='your-secret-key-here')  # Replace with a secure key or use .env
DEBUG = config('DEBUG', default=False, cast=bool)  # Set to True for development

# Update ALLOWED_HOSTS for your environment
ALLOWED_HOSTS = ['localhost', '127.0.0.1']  # Remove placeholders for now

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'patients.apps.PatientsConfig',  # Use Config for explicit app configuration
    'staff.apps.StaffConfig',
    'appointments.apps.AppointmentsConfig',
    'rest_framework_simplejwt',
    'cryptography',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Update CORS_ALLOWED_ORIGINS for your frontend
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # Adjust if using a different frontend port
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

ROOT_URLCONF = 'hos_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'hos_backend.wsgi.application'

# Adjust DATABASES based on your current setup (SQLite for now, update for MySQL later)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',  # Default SQLite database
    }
}
# If using MySQL, ensure it's configured and replace with:
# 'ENGINE': 'django.db.backends.mysql',
# 'NAME': 'hos_db',
# 'USER': 'erickowino',
# 'PASSWORD': 'Password@123',
# 'HOST': 'localhost',
# 'PORT': '3306',

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Set TIME_ZONE to match your location
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Nairobi'  # EAT (UTC+3)
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Comment out Celery settings if not in use
# CELERY_BROKER_URL = 'redis://localhost:6379/0'
# CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
# CELERY_ACCEPT_CONTENT = ['json']
# CELERY_TASK_SERIALIZER = 'json'
# CELERY_RESULT_SERIALIZER = 'json'
