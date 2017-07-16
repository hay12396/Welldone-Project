import { topWrapper } from '../styles/SharedStyles';
import TextInput from '../common/TextInput';
import React, { PropTypes } from 'react';

const CategoryForm = ({ category, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <div className="p16" style={topWrapper}>
                <h1 className="m0">Add new category</h1>
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
                    value={category.name}
                    onChange={onChange}
                    error={errors.name} />
            </div>
        </form>
    );
};

CategoryForm.propTypes = {
    category: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    errors: PropTypes.object
};

export default CategoryForm;