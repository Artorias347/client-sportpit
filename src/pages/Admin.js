import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import { MANAGEPRODUCTS_ROUTE } from '../utils/consts';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <Container className="d-flex flex-column">
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить товар
            </Button>
           <Button
                    variant="outline-dark"
                    className="mt-4 p-2"
                >
                <Link to={MANAGEPRODUCTS_ROUTE}>
                    Управление товаром
                </Link>
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    );
};

export default Admin;
