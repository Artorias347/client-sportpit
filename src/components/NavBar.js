import React, { useContext, useEffect } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, BASKET_ROUTE, REVIEW_ROUTE } from "../utils/consts";
import { Button, Image, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User info:", user);
    }, [user]);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(SHOP_ROUTE);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="mr-auto">
                    <NavLink to={SHOP_ROUTE} style={{ marginRight: '10px', marginTop: '-5px' }}>
                        <Image src={logo} alt="Логотип" style={{ width: '182px', height: '44px' }}/>
                    </NavLink>
                    <NavLink style={{ color: 'white', marginRight: '10px' }} to={SHOP_ROUTE}>
                        <Button variant={"outline-light"}>Магазин</Button>
                    </NavLink>
                    <NavLink style={{ color: 'white' }} to={REVIEW_ROUTE}>
                        <Button variant={"outline-light"}>Обратная связь</Button>
                    </NavLink>
                </Nav>

                {user.isAuth ? (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <NavLink style={{ color: 'white', marginRight: '10px' }} to={BASKET_ROUTE}>
                            <Button variant={"outline-light"}>Корзина</Button>
                        </NavLink>
                        {user.user.role === 'ADMIN' && (
                            <Button
                                style={{ marginRight: '10px' }}
                                variant={"outline-light"}
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                        )}
                        <Button
                            variant={"outline-light"}
                            onClick={logOut}
                        >
                            Выйти
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ml-auto" style={{ color: 'white' }}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
