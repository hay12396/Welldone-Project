import React, { PropTypes } from 'react';

const SelectInput = ({ name, label, onChange, value, error, options, multiple }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <select
                    multiple={multiple}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="form-control" >
                    {options.map((option) => {
                        return <option key={option.value} value={option.value}>{option.text}</option>;
                    })}
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

SelectInput.propTypes = {
    value: PropTypes.array,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default SelectInput;