# courses/models.py
from django.db import models
from django.utils import timezone

class Course(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название курса")
    description = models.TextField(verbose_name="Описание")
    instructor = models.CharField(max_length=100, verbose_name="Преподаватель", blank=True)
    image = models.ImageField(upload_to='course_images/', verbose_name="Изображение курса", blank=True, null=True)
    # upload_to указывает, в какую подпапку внутри MEDIA_ROOT будут загружаться изображения
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    is_published = models.BooleanField(default=True, verbose_name="Опубликован")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Курс"
        verbose_name_plural = "Курсы"
        ordering = ['-created_at'] # Сортировка по умолчанию - новые сверху