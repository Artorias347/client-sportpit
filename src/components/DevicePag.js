import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDevice } from '../../http/deviceAPI';

const DevicePage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    fetchDevice(id).then(data => setDevice(data));
  }, [id]);

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{device.name}</h1>
      <p>Price: {device.price}</p>
      <p>Type: {device.typeId}</p>
      <p>Brand: {device.brandId}</p>
      <p>{device.description}</p>
      <img src={process.env.REACT_APP_API_URL + device.img} alt={device.name} />
    </div>
  );
};

export default DevicePage;
