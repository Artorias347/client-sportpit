import React, { useContext } from 'react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap';

const AvailabilityFilter = observer(() => {
    const { device } = useContext(Context);

    const handleAvailabilityChange = (e) => {
        device.setShowInStock(e.target.checked);
    };

    const handleDiscountChange = (e) => {
        device.setShowDiscounted(e.target.checked);
    };

    return (
        <div>
            <Form.Check 
                type="checkbox"
                label="Товары в наличии"
                onChange={handleAvailabilityChange}
                checked={device.showInStock}
            />
            <Form.Check 
                type="checkbox"
                label="Товары со скидкой"
                onChange={handleDiscountChange}
                checked={device.showDiscounted}
            />
        </div>
    );
});

export default AvailabilityFilter;
