import { $host, $authHost } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', { email, password, role: 'USER' });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const resetPassword = async (email) => {
    const { data } = await $host.post('api/user/reset-password', { email });
    return data.message;
}
