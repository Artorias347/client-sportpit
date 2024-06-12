import axios from 'axios';

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

$authHost.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access - perhaps the token is invalid or expired');
        }
        return Promise.reject(error);
    }
);

export {
    $host,
    $authHost
};
