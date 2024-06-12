import axios from 'axios';

// Создание базового клиента
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Создание клиента для аутентифицированных запросов
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

// Интерцептор для добавления токена в заголовки запросов
const authInterceptor = config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

// Перехватчик для обработки ошибок
$authHost.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            // Тихая обработка ошибки, можно логировать в файл или сервер
            // Например, можно отправить информацию о ошибке в сервис логирования
            // или просто игнорировать ошибку:
            // logError(error); // функция для логирования ошибки
        }
        return Promise.reject(error);
    }
);

export {
    $host,
    $authHost
};
