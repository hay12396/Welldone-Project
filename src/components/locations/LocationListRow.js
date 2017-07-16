import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const LocationListRow = ({ location, onDelete, onClick }) => {
    return (
        <tr>
            <td><a href="#" onClick={() => { onDelete(location); }}>Delete</a></td>
            <td><a href={"http://maps.google.com/?q=" + location.latitude + "," + location.longitude}
                target="_blank" onClick={onClick}>View On Map</a></td>
            <td><Link to={'/location/' + location.id}>{location.name}</Link></td>
            <td>{location.address}</td>
            <td>{location.longitude}</td>
            <td>{location.latitude}</td>
            <td>{location.categories[0]}</td>
        </tr>
    );
};

LocationListRow.propTypes = {
    location: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default LocationListRow;