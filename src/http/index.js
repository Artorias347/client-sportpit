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
async function refreshToken() {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/refresh-token`, {
            // Добавьте нужные данные для обновления токена, например, refreshToken
        });
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        $authHost.defaults.headers['Authorization'] = `Bearer ${newToken}`;
        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        // Обработка ошибки обновления токена, например, перенаправление на страницу логина
    }
}

$authHost.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            const newToken = await refreshToken();
            if (newToken) {
                error.config.headers.authorization = `Bearer ${newToken}`;
                return $authHost.request(error.config);
            }
        }
        return Promise.reject(error);
    }
);

export {
    $host,
    $authHost
};
