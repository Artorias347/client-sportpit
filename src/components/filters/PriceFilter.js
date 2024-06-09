import React, { useContext } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceFilter = observer(() => {
    const { device } = useContext(Context);

    const handleSliderChange = (value) => {
        device.setPriceRange({ min: value[0], max: value[1] });
    };

    return (
        <div>
            <Form.Group controlId="priceRange">
                <Form.Label>Цена</Form.Label>
                <div className="d-flex justify-content-between">
                    <span>{device.priceRange.min} руб.</span>
                    <span>{device.priceRange.max} руб.</span>
                </div>
                <Slider
                    range
                    min={0}
                    max={10000}
                    step={100}
                    value={[device.priceRange.min, device.priceRange.max]}
                    onChange={handleSliderChange}
                />
            </Form.Group>
        </div>
    );
});

export default PriceFilter;
