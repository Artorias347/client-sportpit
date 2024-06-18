import React, { useContext, useState } from 'react';
import { Container, Form, Modal, Toast, ToastContainer } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [notification, setNotification] = useState('');
    const [showToast, setShowToast] = useState(false);

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response?.data?.message || 'Что-то пошло не так');
        }
    };

    const handleResetPassword = () => {
        setNotification('Мы отправили вам по электронной почте инструкции по установке пароля, если существует учетная запись с указанным вами адресом электронной почты. Вы должны получить их в ближайшее время. Если вы не получили электронное письмо, убедитесь, что вы ввели адрес, под которым зарегистрировались, и проверьте папку со спамом.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Скрыть уведомление через 3 секунды
        setShowResetForm(false);
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {showResetForm ? (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш email..."
                                value={resetEmail}
                                onChange={e => setResetEmail(e.target.value)}
                            />
                            <Button
                                variant={"outline-success"}
                                className="mt-3"
                                onClick={handleResetPassword}
                            >
                                Восстановить пароль
                            </Button>
                        </>
                    ) : (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш email..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш пароль..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                                <div>
                                    {isLogin ? (
                                        <>
                                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                                            <Button variant="link" onClick={() => setShowResetForm(true)} style={{ paddingLeft: 0 }}>
                                                Забыли пароль?
                                            </Button>
                                        </>
                                    ) : (
                                        <div>
                                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                        </div>
                                    )}
                                </div>
                                <Button
                                    variant={"outline-success"}
                                    onClick={click}
                                >
                                    {isLogin ? 'Войти' : 'Регистрация'}
                                </Button>
                            </Row>
                        </>
                    )}
                </Form>
            </Card>

            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="me-auto">Уведомление</strong>
                    </Toast.Header>
                    <Toast.Body>{notification}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
});

export default Auth;
