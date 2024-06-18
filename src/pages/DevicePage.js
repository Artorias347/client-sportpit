import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { Context } from '../index';
import Notification from '../components/Notification';

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const { device: deviceStore } = useContext(Context);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data));
  }, [id]);

  const addToCart = (product) => {
    deviceStore.addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <Container className="mt-3">
      {showNotification && <Notification message="Товар добавлен в корзину" />} {/* Отображение уведомления */}
      <Row>
        <Col md={4}>
          <Image width={200} height={200} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={4} className="d-flex flex-column align-items-center">
          <h2>{device.name}</h2>
          <Card className="mt-3 p-2" style={{ width: '100%' }}>
            <h3>Цена: {device.price} руб.</h3>
            <Button
              variant="outline-dark"
              onClick={() => addToCart(device)}
              disabled={device.stock === 0}
            >
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) => (
          <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default DevicePage;
