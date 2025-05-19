// src/CourseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom'; // Импортируем Link для навигации

// URL вашего Django API. Убедитесь, что он правильный.
const API_BASE_URL = 'http://127.0.0.1:8000'; // или http://0.0.0.0:8000

function CourseList() {
    // Состояние для хранения списка курсов
    const [courses, setCourses] = useState([]);
    // Состояние для отслеживания загрузки данных
    const [loading, setLoading] = useState(true);
    // Состояние для хранения ошибок
    const [error, setError] = useState(null);

    // useEffect будет вызван один раз после первого рендера компонента
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true); // Начинаем загрузку
            setError(null);   // Сбрасываем предыдущие ошибки
            try {
                // Делаем GET-запрос к API для получения списка курсов
                const response = await axios.get(`${API_BASE_URL}/courses/courses/`);

                // Проверяем, что ответ содержит массив (как мы выяснили ранее)
                if (Array.isArray(response.data)) {
                    setCourses(response.data); // Сохраняем полученные курсы в состояние
                } else {
                    // Если формат ответа неожиданный
                    console.error("Неожиданный формат данных от API (ожидался массив):", response.data);
                    setCourses([]); // Устанавливаем пустой массив, чтобы избежать ошибок
                    setError("Получен неожиданный формат данных от сервера.");
                }
            } catch (err) {
                // Обработка ошибок при запросе
                console.error("Ошибка при загрузке курсов:", err);
                setError(err.message || "Не удалось загрузить курсы. Проверьте консоль для деталей.");
                setCourses([]); // Устанавливаем пустой массив в случае ошибки
            } finally {
                setLoading(false); // Завершаем загрузку (независимо от успеха или ошибки)
            }
        };

        fetchCourses(); // Вызываем функцию загрузки курсов
    }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз

    // Если данные еще загружаются, показываем сообщение о загрузке
    if (loading) {
        return <p className="status-message">Загрузка курсов...</p>;
    }

    // Если произошла ошибка, показываем сообщение об ошибке
    if (error) {
        return <p className="status-message error-message">Ошибка: {error}</p>;
    }

    // Если курсы не являются массивом (маловероятно после проверок, но для безопасности)
    if (!Array.isArray(courses)) {
        return <p className="status-message error-message">Произошла внутренняя ошибка при обработке данных курсов.</p>;
    }

    // Если курсов нет (после загрузки и без ошибок)
    if (courses.length === 0) {
        return <p className="status-message">Нет доступных курсов.</p>;
    }

    // Если все хорошо, отображаем список курсов
    return (
        <div className="course-list-container">
            <h1>Каталог курсов</h1>
            <div className="course-grid">
                {courses.map(course => (
                    // key должен быть уникальным для каждого элемента в списке
                    <div key={course.id} className="course-card">
                        {/* Оборачиваем изображение и заголовок в RouterLink */}
                        <RouterLink to={`/courses/${course.id}`} className="course-card-link-wrapper">
                            <div className="course-card-image-container">
                                {course.image ? (
                                    <img src={course.image} alt={course.title} className="course-card-image" />
                                ) : (
                                    <img src="https://via.placeholder.com/300x200.png?text=No+Image" alt="Нет изображения" className="course-card-image placeholder-image" />
                                )}
                            </div>
                            <h2 className="course-card-title">{course.title}</h2>
                        </RouterLink>

                        <p className="course-card-instructor">
                            Преподаватель: {course.instructor || "Не указан"}
                        </p>
                        <p className="course-card-description">
                            {course.description
                                ? (course.description.length > 100
                                    ? course.description.substring(0, 100) + '...'
                                    : course.description)
                                : 'Нет описания'}
                        </p>
                        {/* Отдельная кнопка "Подробнее", также ведущая на детальную страницу */}
                        <RouterLink to={`/courses/${course.id}`} className="details-button">
                            Подробнее
                        </RouterLink>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseList;