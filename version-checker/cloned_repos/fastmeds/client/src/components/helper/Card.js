import React from 'react';
import Button from '@mui/material/Button';
import {FaPhone,FaMapMarkerAlt} from 'react-icons/fa';
const Card = ({ store,handleClickOpen }) => {
  
  return (
    <div className="card mb-3" style={{ minWidth: '75%' }}>
      <div className="row g-0">
        <div>
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <h5 className="card-title">{store.name}</h5>
              <p className="card-text"><FaPhone /> {store.contact}</p>
            </div>
            <p className="card-text text-start">
            <FaMapMarkerAlt /> {store.address}, {store.city}
            </p>
            <Button variant="outlined" onClick={e => handleClickOpen(store.latitude, store.longitude)}>
        Location On Map
      </Button>
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <p className="card-text">
                <small className="text-muted">Estimated Distance: {store.distance} m</small>
              </p>
              <p className="card-text">
                <small className="text-muted">Estimated Duration: {store.duration} sec</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
