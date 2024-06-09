import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TypeBar from "../components/filters/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";
import PriceFilter from '../components/filters/PriceFilter';
import AvailabilityFilter from '../components/filters/AvailabilityFilter';
const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, device.limit).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device]);

    useEffect(() => {
        fetchDevices(
            device.selectedType.id,
            device.selectedBrand.id,
            device.page,
            device.limit,
            device.priceRange.min,
            device.priceRange.max,
            device.showInStock,
            device.showDiscounted
        ).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [
        device.page,
        device.selectedType,
        device.selectedBrand,
        device.limit,
        device.priceRange,
        device.showInStock,
        device.showDiscounted
    ]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <h5 style={{ marginTop: '5px'}}>Типы</h5>
                    <TypeBar />
                    <h5 style={{ marginTop: '5px'}}>Бренды</h5>
                    <BrandBar />
                    <h5 style={{ marginTop: '5px'}}>Цена</h5>
                    <PriceFilter />
                    <h5>Наличие</h5>
                    <AvailabilityFilter />
                </Col>
                <Col md={9}>
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
