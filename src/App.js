import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import WebSocketClient from '../WebSocketClient'; // Импортируем WebSocketClient

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Устанавливаем WebSocket-соединение
        const webSocketClient = new WebSocketClient('ws://5.35.88.8:3000/ws');

        // Обработка завершения установки WebSocket-соединения
        webSocketClient.onopen = () => {
            console.log('WebSocket connection established successfully');
        };

        // Обработка ошибок WebSocket-соединения
        webSocketClient.onerror = (error) => {
            console.error('WebSocket connection error:', error);
        };

        // Отписываемся от WebSocket-соединения при размонтировании компонента
        return () => {
            webSocketClient.close();
        };
    }, []); // Пустой массив зависимостей, чтобы этот эффект выполнялся только один раз при монтировании

    useEffect(() => {
        check().then(data => {
            user.setUser(true);
            user.setIsAuth(true);
        }).finally(() => setLoading(false));
    }, [user]);

    if (loading) {
        return <Spinner animation="grow" />;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
