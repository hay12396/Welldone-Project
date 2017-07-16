import React, { PropTypes } from 'react';
import Loader from './Loader';

const LoadingIndicator = ({ loading }) => {
    return (
        <div>
            {loading && <Loader />}
        </div>
    );
};

LoadingIndicator.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default LoadingIndicator;