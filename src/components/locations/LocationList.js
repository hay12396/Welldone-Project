import React, { PropTypes } from 'react';
import LocationListRow from './LocationListRow';

const LocationList = ({ locations, onDelete, onClick, sortBy, filteredCategoryId }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Delete</th>
                        <th>View On Map</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {locations
                        .filter(location => filteredCategoryId === 'All'
                            || location.categories[0] === filteredCategoryId)
                        .sort((a, b) => {
                            if (sortBy === 'grouped') {
                                return a.categories[0].localeCompare(b.categories[0]);
                            }
                            else if (sortBy === 'ungrouped') {
                                return a.id.localeCompare(b.id);
                            }
                            else //alphabetic
                            {
                                return a.name.localeCompare(b.name);
                            }
                        })
                        .map(
                        (location) =>
                            <LocationListRow key={location.id} location={location} onDelete={onDelete}
                                onClick={onClick} />
                        )}
                </tbody>
            </table >
        </div>
    );
};

LocationList.propTypes = {
    filteredCategoryId: PropTypes.string.isRequired,
    locations: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired
};

export default LocationList;