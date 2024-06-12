import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Настройка уведомлений
toast.configure();

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const authInterceptor = config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

function notifyError(message) {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}

function logError(error) {
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', error);
    } else {
        // В продакшене можно отправлять ошибки на сервер или игнорировать
    }
}

$authHost.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            notifyError('Unauthorized access. Please log in again.');
            logError(error);
        }
        return Promise.reject(error);
    }
);

export {
    $host,
    $authHost
};
