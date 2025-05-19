from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet

router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')

app_name = 'courses_app' 
urlpatterns = [
    path('', include(router.urls)),
]