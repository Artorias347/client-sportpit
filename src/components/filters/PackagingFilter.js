import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';

const PackagingFilter = observer(() => {
    const { device } = useContext(Context);

    return (
        <ListGroup>
            {device.packagings.map(packaging => (
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={packaging.id === device.selectedPackaging.id}
                    onClick={() => device.setSelectedPackaging(packaging)}
                    key={packaging.id}
                >
                    {packaging.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default PackagingFilter;
