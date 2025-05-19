# courses/views.py
from rest_framework import viewsets, permissions
from .models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    """
    API эндпоинт для просмотра и редактирования курсов.
    """
    queryset = Course.objects.filter(is_published=True).order_by('-created_at')
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny] 