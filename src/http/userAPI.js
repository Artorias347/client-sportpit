import { $host, $authHost } from "./index";
import { jwtDecode } from "jwt-decode"; // Ensure you're using default export

export const registration = async (email, password, userContext) => {
    const { data } = await $host.post('api/user/registration', { email, password, role: 'USER' });
    localStorage.setItem('token', data.token);
    const decodedToken = jwtDecode(data.token);
    userContext.setUser(decodedToken);
    userContext.setIsAuth(true);
    return decodedToken;
}

export const login = async (email, password, userContext) => {
    const { data } = await $host.post('api/user/login', { email, password });
    localStorage.setItem('token', data.token);
    const decodedToken = jwtDecode(data.token);
    userContext.setUser(decodedToken);
    userContext.setIsAuth(true);
    return decodedToken;
}

export const check = async (user) => {
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    user.setUser(decoded);  // Ensure the context user is passed correctly
    user.setIsAuth(true);
    return decoded;
}
