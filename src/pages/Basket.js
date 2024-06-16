import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Col, Image, Button, Container, Row, Modal, Form, Alert } from "react-bootstrap";
import star from '../assets/star.png';
import { Link } from 'react-router-dom';
import { SHOP_ROUTE } from "../utils/consts";

const Basket = observer(() => {
    const { device } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [orderData, setOrderData] = useState({
        name: '',
        address: '',
        email: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);

    const removeFromCart = (product) => {
        device.removeFromCart(product);
    };

    const getTypeName = (typeId) => {
        const type = device.types.find(t => t.id === typeId);
        return type ? type.name : 'Unknown';
    };

    const getBrandName = (brandId) => {
        const brand = device.brands.find(b => b.id === brandId);
        return brand ? brand.name : 'Unknown';
    };

    const handleOrder = () => {
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Логирование данных заказа перед отправкой
            console.log('Отправка данных заказа:', {
                name: orderData.name,
                address: orderData.address,
                email: orderData.email,
                cart: device.cart.map(product => ({
                    id: product.id,
                    quantity: 1
                }))
            });

            const response = await fetch('/api/order/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: orderData.name,
                    address: orderData.address,
                    email: orderData.email,
                    cart: device.cart.map(product => ({
                        id: product.id,
                        quantity: 1 // Рассмотрите логику для учета количества товаров
                    }))
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при оформлении заказа');
            }

            const data = await response.json();
            console.log('Заказ успешно оформлен:', data);
            setShowModal(false);
            setOrderPlaced(true);
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
            // Дополнительная обработка ошибки
            alert('Ошибка при оформлении заказа: ' + error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({
            ...orderData,
            [name]: value
        });
    };

    const handleReturnToMain = () => {
        setOrderPlaced(false);
    };

    return (
        <Container>
            <Row className="mt-2">
                <div>
                    <h2>Корзина</h2>
                    <div className="row">
                        {device.cart.map((product, index) => (
                            <Col md={4} className="mt-3" key={index}>
                                <Card style={{ width: '15rem', minHeight: '250px', padding: '10px', cursor: 'pointer' }} border="light">
                                    <Image width="100%" height="auto" src={process.env.REACT_APP_API_URL + product.img} alt={product.name} style={{ objectFit: 'contain', maxHeight: '150px' }} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title style={{ fontSize: '0.8rem' }}>Название: {product.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8rem' }}>Цена: {product.price}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8rem' }}>Тип: {getTypeName(product.typeId)}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8rem' }}>Бренд: {getBrandName(product.brandId)}</Card.Subtitle>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <span style={{ fontSize: '0.8rem' }}>{product.brand}</span>
                                            <div className="d-flex align-items-center">
                                                <span style={{ fontSize: '0.8rem' }}>{product.rating}</span>
                                                <Image width={14} height={14} src={star} />
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Button variant="danger" className="mt-2" onClick={() => removeFromCart(product)}>Удалить</Button>
                            </Col>
                        ))}
                    </div>
                    {device.cart.length > 0 ? (
                        <Button variant="success" className="mt-3" onClick={handleOrder}>Оформить заказ</Button>
                    ) : (
                        <Alert variant="warning" className="mt-3">Добавьте товар в корзину</Alert>
                    )}
                    {orderPlaced && (
                        <div className="mt-3">
                            <Alert variant="success">Заказ оформлен успешно!</Alert>
                            <Link to={SHOP_ROUTE} className="btn btn-primary mt-3">
                                Вернуться на главную
                            </Link>
                        </div>
                    )}
                </div>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Оформление заказа</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите ваше имя" 
                                name="name" 
                                value={orderData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formAddress" className="mt-3">
                            <Form.Label>Адрес</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите ваш адрес" 
                                name="address" 
                                value={orderData.address} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Введите ваш email" 
                                name="email" 
                                value={orderData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Отправить заказ
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
});

export default Basket;
