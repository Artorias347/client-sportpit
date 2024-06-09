import React from 'react';
import { Card, Container } from 'react-bootstrap';

const Home = () => {
    return (
        <Container className="text-center">
            <h1 className="display-4">SportPit</h1>
            <p className="lead">
                В Интернет-магазине SportPit вы сможете купить спортивное питание известных Российских и Европейских брендов.
            </p>
            <p>
                Добавьте в свой рацион спортивное питание и вы быстрее достигнете нужного результата!
            </p>

            <h2>Наш ассортимент</h2>
            <ul className="list-unstyled">
                <li>Протеин</li>
                <li>Гейнеры</li>
                <li>BCAA</li>
                <li>Креатин</li>
                <li>Витамины и минералы</li>
                <li>Аминокислоты</li>
                <li>Спортивные батончики</li>
            </ul>

            <Card style={{ marginTop: '350px'}}>
                <Card.Body >
                    <Card.Title >Контакты</Card.Title>
                    <Card.Text>
                        <strong>Адрес:</strong> г. Екатеринбург, ул. Спортивная, д. 10<br />
                        <strong>Телефон:</strong> +7 (495) 123-45-67<br />
                        <strong>Email:</strong> info@sportpit.ru
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Home;
