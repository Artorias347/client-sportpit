import React from 'react';
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png';
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
    const history = useHistory();
    return (
        <Col md={4} className="mt-3" onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card 
                style={{ width: '15rem', minHeight: '250px', padding: '10px', cursor: 'pointer' }} 
                border="light"
            >
                <Image 
                    width="100%" 
                    height="auto" 
                    src={process.env.REACT_APP_API_URL + device.img} 
                    alt={device.name} 
                    style={{ objectFit: 'contain', maxHeight: '150px' }} 
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: '1rem' }}>{device.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8rem' }}>{device.type}</Card.Subtitle>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span style={{ fontSize: '0.7rem', marginBottom: '4px' }}>{device.brand}</span>
                        <div className="d-flex align-items-center">
                            <span style={{ fontSize: '0.8rem' }}>{device.rating}</span>
                            <Image width={14} height={14} src={star} />
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;
