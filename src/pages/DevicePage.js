import React, { useEffect, useState, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { Context } from '../index';
import Notification from '../components/Notification';
import Reviews from '../components/Reviews';

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
      {showNotification && <Notification message="Товар добавлен в корзину" />}
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
        </Col>
        <Col md={8}>
          <Row>
            <Col>
              <h6 className="text-muted">{device.category || 'Сывороточный'}</h6>
              <h2>{device.name}</h2>
              <h6 className="text-danger">{device.reviews?.length > 0 ? `${device.reviews.length} отзывов` : 'нет отзывов'}</h6>
              <h4>{device.stock > 0 ? 'В наличии' : 'Нет в наличии'}</h4>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button
                variant="outline-dark"
                onClick={() => addToCart(device)}
                disabled={device.stock === 0}
              >
                Добавить в корзину
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Card className="p-2 border-0">
                <Card.Body>
                  <Alert variant="danger" className="mb-0">
                    Обратите внимание на <a href="#" className="text-danger text-decoration-underline">условия бесплатной доставки</a>
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
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
      <Row className="d-flex flex-column m-3">
        <Reviews />
      </Row>
    </Container>
  );
};

export default DevicePage;
