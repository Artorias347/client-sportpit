import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ message }) => {
  return (
    <Alert variant="success" className="mt-3">
      Товар добавлен в козину
    </Alert>
  );
};

export default Notification;
