import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as locationActions from '../../actions/locationActions';
import LocationForm from './LocationForm';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class ManageLocationPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            location: Object.assign({}, this.props.location),
            errors: {},
            saving: false
        };

        this.updateLocationState = this.updateLocationState.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.location.id !== nextProps.location.id) {
            this.setState({ location: Object.assign({}, nextProps.location) });
        }
    }

    onMapClick(event) {
        let location = Object.assign({}, this.state.location);
        location.longitude = event.lng;
        location.latitude = event.lat;
        this.setState({ location: location });
    }

    updateLocationState(event) {
        const field = event.target.name;
        let location = Object.assign({}, this.state.location);
        location.categories = [...this.state.location.categories];
        const value = event.target.value;
        if (field === 'categories') {
            const index = location.categories.indexOf(value);
            if (index != -1) {
                location.categories.splice(index, 1);
            }
            else {
                location[field].push(event.target.value);
            }
        }
        else {
            location[field] = event.target.value;
        }
        return this.setState({ location: location });
    }

    isNumber(n) {
        return parseInt(n) == n || parseFloat(n) == n;
    }

    saveLocation(event) {
        event.preventDefault();
        let valid = true;
        let errors = {};
        if (this.state.location.name.length == 0) {
            errors.name = "Please enter the location name.";
            valid = false;
        }

        if (this.state.location.address == 0) {
            errors.address = "Please enter the location address.";
            valid = false;
        }

        if (this.state.location.categories.length == 0) {
            errors.categories = "Please select a category.";
            valid = false;
        }

        if (!this.isNumber(this.state.location.longitude)) {
            errors.lnglat = "Please select your location from the map.";
            valid = false;
        }

        if (!this.isNumber(this.state.location.latitude)) {
            errors.latitude = "Latitude must be a number.";
            valid = false;
        }

        if (this.state.location.latitude.length == 0) {
            errors.latitude = "Please enter the location latitude.";
            valid = false;
        }

        if (!valid) {
            this.setState({ errors: errors });
            return;
        }

        this.setState({ saving: true });
        this.props.actions.saveLocation(this.state.location)
            .then(() => {
                this.setState({ saving: false });
                browserHistory.push('/locations');
                toastr.success('Changes saved.');
            }).catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    render() {
        return (
            <LocationForm
                onChange={this.updateLocationState}
                allCategories={this.props.categories}
                location={this.state.location}
                errors={this.state.errors}
                onSave={this.saveLocation}
                saving={this.state.saving}
                onClick={this.onMapClick} />
        );
    }
}

ManageLocationPage.propTypes = {
    location: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function getLocationById(locations, id) {
    const filteredLocations = locations.filter(location => location.id === id);
    if (filteredLocations.length > 0) return filteredLocations[0];
    return null;
}

function mapStateToProps(rootReducer, props) {
    let location = {};
    if (props.params.locationId && rootReducer.locations.length > 0) {
        location = getLocationById(rootReducer.locations, props.params.locationId);
    }
    else {
        location = { id: '', name: '', address: '', categories: [], longitude: '', latitude: '' };
    }

    const formattedCategoryList = rootReducer.categories.map((category) => {
        return {
            value: category.id,
            text: category.name
        };
    });

    return {
        location: location,
        categories: formattedCategoryList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(locationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLocationPage);