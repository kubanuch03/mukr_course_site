// src/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom'; // useParams для получения ID, RouterLink для навигации
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // или http://0.0.0.0:8000

function CourseDetail() {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useParams() возвращает объект с параметрами из URL.
    // Если наш маршрут "/courses/:courseId", то courseId будет доступен здесь.
    const { courseId } = useParams();

    useEffect(() => {
        const fetchCourseDetail = async () => {
            if (!courseId) return; // Не делаем запрос, если ID не определен

            setLoading(true);
            setError(null);
            try {
                // Запрашиваем данные конкретного курса по его ID
                const response = await axios.get(`${API_BASE_URL}/courses/courses/${courseId}/`);
                setCourse(response.data); // Сохраняем данные курса
            } catch (err) {
                console.error(`Ошибка при загрузке курса ${courseId}:`, err);
                if (err.response && err.response.status === 404) {
                    setError(`Курс с ID ${courseId} не найден.`);
                } else {
                    setError(err.message || `Не удалось загрузить данные курса ${courseId}.`);
                }
                setCourse(null); // Сбрасываем курс в случае ошибки
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetail();
    }, [courseId]); // Эффект будет перезапущен, если courseId изменится (например, при переходе с одной детальной страницы на другую)

    if (loading) {
        return <p className="status-message">Загрузка информации о курсе...</p>;
    }

    if (error) {
        return (
            <div className="course-detail-container error-page">
                <p className="status-message error-message">Ошибка: {error}</p>
                <RouterLink to="/" className="back-link">← Назад к списку курсов</RouterLink>
            </div>
        );
    }

    if (!course) { // Если курс не загружен (и нет ошибки, что маловероятно здесь)
        return (
            <div className="course-detail-container error-page">
                <p className="status-message">Курс не найден.</p>
                <RouterLink to="/" className="back-link">← Назад к списку курсов</RouterLink>
            </div>
        );
    }

    // Отображаем детальную информацию о курсе
    return (
        <div className="course-detail-container">
            <RouterLink to="/" className="back-link">← Назад к списку курсов</RouterLink>
            <h1 className="course-detail-title">{course.title}</h1>

            {course.image && (
                <div className="course-detail-image-container">
                    <img src={course.image} alt={course.title} className="course-detail-image" />
                </div>
            )}

            <div className="course-detail-info">
                <p className="course-detail-instructor">
                    <strong>Преподаватель:</strong> {course.instructor || "Не указан"}
                </p>
                <div className="course-detail-description">
                    <strong>Описание:</strong>
                    <p>{course.description || "Описание отсутствует."}</p>
                </div>
                <p className="course-detail-created">
                    <strong>Дата создания:</strong> {new Date(course.created_at).toLocaleDateString('ru-RU')}
                </p>
                {/* Здесь можно добавить больше деталей, если они есть в API */}
                {/* Например, список уроков, модулей и т.д. */}
            </div>
        </div>
    );
}

export default CourseDetail;