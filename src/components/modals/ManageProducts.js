import React, { useContext } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const ManageProducts = observer(() => {
    const { device } = useContext(Context);

    return (
        <Container>
            <h1>Управление товарами</h1>
            {device.devices.length === 0 ? (
                <p>Товары не найдены</p>
            ) : (
                <Row>
                    {device.devices.map(product => (
                        <Col md={4} key={product.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={product.img} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>Цена: {product.price}</Card.Text>
                                    <Form>
                                        <Form.Group controlId={`formQuantity${product.id}`}>
                                            <Form.Label>Количество на складе</Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                defaultValue={product.stock} 
                                                onChange={(e) => device.updateStock(product.id, e.target.value)} 
                                            />
                                        </Form.Group>
                                        <Button variant="primary" className="mt-2">
                                            Обновить
                                        </Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
});

export default ManageProducts;
