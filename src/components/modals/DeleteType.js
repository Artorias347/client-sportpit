import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, ListGroup } from "react-bootstrap";
import { getTypes, deleteType,fetchTypes } from "../../http/deviceAPI";

const DeleteType = ({ show, onHide }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetchTypes();
        setTypes(response.data);
      } catch (error) {
        console.error('Ошибка при получении типов:', error);
      }
    };

    fetchTypes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteType(id);
      // После удаления типа обновляем список типов
      await fetchTypes(); // Получаем обновленный список типов
    } catch (error) {
      console.error('Ошибка при удалении типа:', error);
    }
  };
  

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {types.map((type) => (
            <ListGroup.Item key={type.id}>
              {type.name}
              <Button variant="outline-danger" style={{ float: 'right' }} onClick={() => handleDelete(type.id)}>Удалить</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteType;
