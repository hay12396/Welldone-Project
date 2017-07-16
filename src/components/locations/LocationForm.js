import { topWrapper } from '../styles/SharedStyles';
import SelectInput from '../common/SelectInput';
import MapSelector from '../common/MapSelector';
import TextInput from '../common/TextInput';
import React, { PropTypes } from 'react';

const LocationForm = ({ location, allCategories, onSave, onChange, saving, errors, onClick }) => {
    return (
        <form>
            <div className="p16" style={topWrapper}>
                <h1 className="m0">Add new location</h1>
                <input
                    type="submit"
                    disabled={saving}
                    value={saving ? "Saving.." : "Save"}
                    className="btn btn-primary"
                    onClick={onSave} />
            </div>
            <div className="p16">
                <TextInput
                    name="name"
                    label="Name"
                    value={location.name}
                    onChange={onChange}
                    error={errors.name} />

                <TextInput
                    name="address"
                    label="Address"
                    value={location.address}
                    onChange={onChange}
                    error={errors.address} />

                <MapSelector onClick={onClick}
                    error={errors.lnglat}
                    lng={parseFloat(location.longitude)}
                    lat={parseFloat(location.latitude)}
                    center={[34, 34]}
                    zoom={5} />

                <SelectInput
                    name="categories"
                    label="Category"
                    multiple={true}
                    value={location.categories}
                    defaultOption="Select Categories"
                    options={allCategories}
                    onChange={onChange}
                    error={errors.categories} />
            </div>
        </form>
    );
};

LocationForm.propTypes = {
    allCategories: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    errors: PropTypes.object,
    saving: PropTypes.bool
};

export default LocationForm;