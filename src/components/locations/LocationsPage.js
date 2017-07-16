import * as locationActions from '../../actions/locationActions';
import { addBtn, topWrapper } from '../styles/SharedStyles';
import SelectInput from '../common/SelectInput';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import LocationList from './LocationList';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';

class LocationsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            filteredCategoryId: 'All',
            sortOptions: [{ value: 'grouped', text: 'grouped' },
            { value: 'ungrouped', text: 'ungrouped' },
            { value: 'alphabetic', text: 'alphabetic' }],
            sortBy: 'grouped'
        };

        this.redirectToAddLocationPage = this.redirectToAddLocationPage.bind(this);
        this.filterLocations = this.filterLocations.bind(this);
        this.deleteLocation = this.deleteLocation.bind(this);
        this.vibrateDevice = this.vibrateDevice.bind(this);
        this.sortLocations = this.sortLocations.bind(this);
    }

    vibrateDevice() {
        window.navigator.vibrate(200);
    }

    redirectToAddLocationPage(/*event*/) {
        browserHistory.push('/location');
    }

    filterLocations(event) {
        const categoryId = event.target.value;
        return this.setState({ filteredCategoryId: categoryId });
    }

    sortLocations(event) {
        const sortBy = event.target.value;
        return this.setState({ sortBy: sortBy });
    }

    deleteLocation(location) {
        this.props.actions.deleteLocation(location)
            .then(() => {
                toastr.success('Location deleted.');
            })
            .catch((error) => {
                toastr.error(error);
            });
    }

    render() {
        return (
            <div>
                <div className="p16" style={topWrapper}>
                    <h1 className="m0">Locations</h1>
                    <input type="submit"
                        value="+"
                        className="btn btn-primary" style={addBtn}
                        onClick={this.redirectToAddLocationPage} />
                </div>
                <div className="p16">
                    <SelectInput name="filter"
                        multiple={false}
                        label="Filter List: "
                        defaultOption="All"
                        options={this.props.categories}
                        onChange={this.filterLocations} />

                    <SelectInput name="sortBy"
                        multiple={false}
                        label="Sort List: "
                        defaultOption="Select a sort option: "
                        options={this.state.sortOptions}
                        onChange={this.sortLocations} />

                    {this.props.locations.length > 0 &&
                        <LocationList locations={this.props.locations}
                            onDelete={this.deleteLocation}
                            onClick={this.vibrateDevice}
                            sortBy={this.state.sortBy}
                            filteredCategoryId={this.state.filteredCategoryId} />}
                </div>
            </div>
        );
    }
}

LocationsPage.propTypes = {
    categories: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(rootReducer/*, ownProps*/) {
    const formattedCategoryList = rootReducer.categories.map((category) => {
        return {
            value: category.id,
            text: category.name
        };
    });

    formattedCategoryList.unshift({ value: 'All', text: 'All' });

    return {
        locations: rootReducer.locations,
        categories: formattedCategoryList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(locationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsPage);