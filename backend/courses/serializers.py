# courses/serializers.py
from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    # image поле будет автоматически содержать URL, если MEDIA_URL настроен
    # DRF достаточно умен, чтобы правильно обрабатывать ImageField
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor', 'image', 'created_at', 'updated_at', 'is_published']