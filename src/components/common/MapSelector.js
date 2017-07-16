import GoogleMap from 'google-map-react';
import React, { PropTypes } from 'react';
import Marker from './Marker';

const MapSelector = ({ center, zoom, onClick, error, lng, lat }) => {
    let wrapperClass = "form-group";
    if (error && error.length > 0) {
        wrapperClass += " " + "has-error";
    }

    return (
        <div className={wrapperClass} >
            <label>Location:</label>
            <div style={{ width: 250 + "px", height: 250 + "px" }}>
                <GoogleMap
                    bootstrapURLKeys={{ key: "AIzaSyCqsL5hTURueRGQFB00Q9y_Fk6P57kn7EQ" }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    onClick={onClick} >

                    {lng && <Marker lat={lat} lng={lng} text="You" />}

                </GoogleMap>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

MapSelector.propTypes = {
    center: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    zoom: PropTypes.number.isRequired,
    error: PropTypes.string,
    lng: PropTypes.number,
    lat: PropTypes.number
};

export default MapSelector;