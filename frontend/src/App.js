// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom'; // RouterLink чтобы не путать с обычным Link
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import './App.css'; // Основные стили приложения

function App() {
  return (
    <Router> {/* Оборачиваем все приложение в Router для работы маршрутизации */}
      <div className="App">
        <header className="App-header">
          <nav>
            {/* Ссылка для возврата на главную страницу (список курсов) */}
            <RouterLink to="/" className="nav-link">
              Все курсы
            </RouterLink>
            {/* Здесь можно добавить другие глобальные навигационные ссылки */}
          </nav>
        </header>
        <main className="App-main">
          <Routes> {/* Контейнер для определения отдельных маршрутов */}
            {/* Маршрут для главной страницы - отображает список курсов */}
            <Route path="/" element={<CourseList />} />

            {/* Маршрут для детальной страницы курса */}
            {/* :courseId - это динамический параметр, который будет содержать ID курса */}
            <Route path="/courses/:courseId" element={<CourseDetail />} />

            {/* Можно добавить маршрут для страницы "Не найдено", если нужно */}
            {/* <Route path="*" element={<div>Страница не найдена (404)</div>} /> */}
          </Routes>
        </main>
        <footer className="App-footer">
          <p>© {new Date().getFullYear()} Платформа Обучающих Курсов</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;