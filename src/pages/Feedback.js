import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { $host } from "../http/index";

const Feedback = () => {
  const [feedback, setfeedback] = useState([]);
  const [newfeedback, setNewfeedback] = useState('');
  const [author, setAuthor] = useState('');

  const fetchFeedback = async () => {
    try {
      const response = await $host.get('/api/feedback');
      setfeedback(response.data);
    } catch (error) {
      console.error('Ошибка при получении отзывов:', error);
    }
  };

  useEffect(() => {
    fetchfeedback();
  }, []);

  const handlefeedbackChange = (e) => {
    setNewfeedback(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmitfeedback = async (e) => {
    e.preventDefault();
    try {
      await $host.post('/api/feedback', { text: newfeedback, author: author });
      setNewfeedback('');
      setAuthor('');
      // После добавления отзыва обновляем список отзывов
      fetchfeedback();
    } catch (error) {
      console.error('Ошибка при добавлении отзыва:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Отзывы</h1>
        </Col>
      </Row>
      <Row>
        <Col style={{marginTop: '30px'}}>
          <h2>Добавить отзыв</h2>
          <Form onSubmit={handleSubmitfeedback}>
            <Form.Group controlId="formfeedback">
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newfeedback}
                onChange={handlefeedbackChange}
              />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Автор</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={handleAuthorChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop: '10px'}}>
              Отправить
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col style={{marginTop: '30px'}}>
          <h2>Все отзывы</h2>
          <ListGroup>
            {feedback.map((feedback, index) => (
              <ListGroup.Item key={index}>
                <strong>{feedback.author}: </strong>
                {feedback.text}
                <div style={{fontSize: '0.8em', marginTop: '5px'}}>Добавлено: {feedback.time}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default feedback;
