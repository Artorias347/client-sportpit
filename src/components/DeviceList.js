import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import { Context } from '../index';
import { Link } from 'react-router-dom';
import star from '../assets/star.png';
import Notification from './Notification';

const DeviceList = observer(() => {
  const { device, user } = useContext(Context);
  const [showNotification, setShowNotification] = useState(false);

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedDevices = chunkArray(device.devices, 3);

  const addToCart = (product) => {
    device.addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const getTypeName = (typeId) => {
    const type = device.types.find(t => t.id === typeId);
    return type ? type.name : 'Unknown';
  };

  const getBrandName = (brandId) => {
    const brand = device.brands.find(b => b.id === brandId);
    return brand ? brand.name : 'Unknown';
  };

  return (
    <Row>
      {showNotification && <Notification message="Товар добавлен в корзину" />}
      {chunkedDevices.map((row, rowIndex) => (
        <Row className="mb-4" key={rowIndex}>
          {row.map(product => (
            <Col md={4} key={product.id} className="d-flex align-items-stretch">
              <Card style={{ width: '16rem', minHeight: '250px', padding: '10px' }} className="d-flex flex-column">
                <Image variant="top" src={process.env.REACT_APP_API_URL + product.img} style={{ height: '120px', objectFit: 'contain' }} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title style={{ fontSize: '1rem' }}>Название: {product.name}</Card.Title>
                  <Card.Text style={{ fontSize: '0.9rem' }}>
                    Цена: {product.price} руб.
                  </Card.Text>
                  <Card.Text style={{ fontSize: '0.9rem' }}>
                    Тип: {getTypeName(product.typeId)}
                  </Card.Text>
                  <Card.Text style={{ fontSize: '0.9rem' }}>
                    Бренд: {getBrandName(product.brandId)}
                  </Card.Text>
                  <Card.Text style={{ fontSize: '0.9rem' }}>
                    Количество: {product.stock > 0 ? product.stock : 'Нет в наличии'}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex align-items-center">
                      <span style={{ fontSize: '0.8rem' }}>{product.rating}</span>
                      <Image width={14} height={14} src={star} />
                    </div>
                  </div>
                  <Link to={`/device/${product.id}`} className="btn btn-primary mt-2 align-self-end">Подробнее</Link>
                  {user.isAuth && (
                    <Button 
                      variant="success" 
                      className="mt-2 align-self-end" 
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      Купить
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </Row>
  );
});

export default DeviceList;
