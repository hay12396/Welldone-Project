import React from 'react';


const Loader = () => {
    return (
        <div id="page-loader" >
            <div className="cssload-container">
                <div className="cssload-speeding-wheel" />
            </div>
            <span className="loader-text">Loading..</span>
        </div>
    );
};

export default Loader;