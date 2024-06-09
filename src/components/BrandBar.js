import React, { useContext, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Context } from "../index";
import { fetchBrands } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const Brands = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchBrands();
            device.setBrands(data);
        };
        fetchData();
    }, [device.setBrands]);  // Notice this change

    return (
        <ListGroup>
            {device.brands.map(brand => (
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={brand.id === device.selectedBrand.id}
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                >
                    {brand.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default Brands;
