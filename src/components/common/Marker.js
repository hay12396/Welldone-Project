import markerStyle from './styles/MarkerStyle';
import React, { PropTypes } from 'react';

export default class Marker extends React.Component {
    render() {
        return (
            <div style={markerStyle}>
                {this.props.text}
            </div>
        );
    }
}

Marker.propTypes = {
    text: PropTypes.string.isRequired
};

