import React, { useContext, useEffect } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE, REVIEW_ROUTE } from "../utils/consts";
import { Button, Image, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Убедитесь, что путь к логотипу правильный

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
        <Nav className="ml-auto" style={{ color: 'white' }}>
            {isAuth ? (
                <>
                    <NavLink style={{ color: 'white', marginRight: '10px' }} to={BASKET_ROUTE}>
                        <Button variant={"outline-light"}>Корзина</Button>
                    </NavLink>
                    {userRole === 'admin' && (
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
                </>
            ) : (
                <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
            )}
        </Nav>
    );
},

export default NavBar;
