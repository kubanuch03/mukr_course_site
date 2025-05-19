# courses/admin.py
from django.contrib import admin
from .models import Course
from unfold.admin import ModelAdmin # Use ModelAdmin from unfold consistently

@admin.register(Course)
class CourseAdmin(ModelAdmin):
    list_display = ('title', 'instructor', 'created_at', 'is_published')
    list_filter = ('is_published', 'instructor')
    search_fields = ('title', 'description')
    list_editable = ('is_published',) # Позволяет редактировать прямо из списка
    # Если хотите более удобное поле для описания:
    # from django_summernote.admin import SummernoteModelAdmin # Если используете summernote
    # class CourseAdmin(SummernoteModelAdmin):
    #     summernote_fields = ('description',)
    # ... (остальное как выше)

# Или просто:
# admin.site.register(Course)