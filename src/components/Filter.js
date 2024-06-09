import React from 'react';
import PriceFilter from './PriceFilter';
import AvailabilityFilter from './AvailabilityFilter';
import Brands from './Brands';
import TypeBar from './TypeBar';
import PackagingFilter from './PackagingFilter';
import { Col, Row } from 'react-bootstrap';

const Filters = () => {
    return (
        <Row>
            <Col md={3}>
                <PriceFilter />
                <AvailabilityFilter />
                <TypeBar />
                <Brands />
                <PackagingFilter />
            </Col>
        </Row>
    );
};

export default Filters;
