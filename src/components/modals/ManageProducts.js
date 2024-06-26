import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { observer } from "mobx-react-lite";
import { Context } from '../../index';
import { fetchDevices, updateDevice, deleteDevice } from '../../http/deviceAPI'; // импортируем функцию для удаления

const ManageProducts = observer(() => {
    const { device } = useContext(Context);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({ name: '', price: '', stock: '' });
    const [loading, setLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchDevices(null, null, 1, device.limit);
            device.setDevices(data.rows);
            setLoading(false);
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
            setLoading(false);
        }
    }, [device]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        setUpdatedProduct({
            name: product.name,
            price: product.price,
            stock: product.stock,
        });
    };

    const handleSave = async () => {
        try {
            await updateDevice(selectedProduct.id, updatedProduct);
            await fetchProducts(); // Повторно получаем обновленные данные
            setShowModal(false);
        } catch (error) {
            console.error('Ошибка обновления товара:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await deleteDevice(productId);
            await fetchProducts(); // Повторно получаем обновленные данные
        } catch (error) {
            console.error('Ошибка удаления товара:', error);
        }
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
                    {device.devices.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock > 0 ? product.stock : 'Нет в наличии'}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(product)}>
                                    Редактировать
                                </Button>
                                <Button variant="danger" className="ml-2" onClick={() => handleDelete(product.id)}>
                                    Удалить
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
                                type="number" // Измените на number для числового ввода
                                placeholder="Введите цену"
                                name="price"
                                value={updatedProduct.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formStock" className="mt-3">
                            <Form.Label>Количество</Form.Label>
                            <Form.Control
                                type="number" // Измените на number для числового ввода
                                placeholder="Введите количество"
                                name="stock"
                                value={updatedProduct.stock}
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
