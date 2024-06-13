import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { observer } from "mobx-react-lite";
import { Context } from '../../index';

const ManageProducts = observer(() => {
    const { device } = useContext(Context);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({ name: '', price: '', quantity: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Логика загрузки данных товаров, если требуется
            setLoading(false);
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        setUpdatedProduct({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
        });
    };

    const handleSave = () => {
        device.updateProduct(selectedProduct.id, updatedProduct); // Вызываем метод updateProduct из хранилища
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: value,
        });
    };

    if (loading) {
        return <p>Загрузка товаров...</p>;
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {device.products && device.products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(product)}>
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать товар</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название"
                                name="name"
                                value={updatedProduct.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice" className="mt-3">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите цену"
                                name="price"
                                value={updatedProduct.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantity" className="mt-3">
                            <Form.Label>Количество</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите количество"
                                name="quantity"
                                value={updatedProduct.quantity}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default ManageProducts;
