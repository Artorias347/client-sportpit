import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { $host } from "../http/index";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [author, setAuthor] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await $host.get('/api/review');
      setReviews(response.data);
    } catch (error) {
      console.error('Ошибка при получении отзывов:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await $host.post('/api/review', { text: newReview, author: author });
      setNewReview('');
      setAuthor('');
      // После добавления отзыва обновляем список отзывов
      fetchReviews();
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
          <Form onSubmit={handleSubmitReview}>
            <Form.Group controlId="formReview">
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newReview}
                onChange={handleReviewChange}
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
            {reviews.map((review, index) => (
              <ListGroup.Item key={index}>
                <strong>{review.author}: </strong>
                {review.text}
                <div style={{fontSize: '0.8em', marginTop: '5px'}}>Добавлено: {review.time}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
