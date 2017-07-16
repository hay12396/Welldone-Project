import * as types from './actionTypes';
import LocationApi from '../api/mockLocationApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function createLocation(location) {
    return { type: types.CREATE_LOCATION, location: location };
}

export function createLocationSuccess(location) {
    return { type: types.CREATE_LOCATION_SUCCESS, location: location };
}

export function updateLocationSuccess(location) {
    return { type: types.UPDATE_LOCATION_SUCCESS, location: location };
}

export function loadLocationsSuccess(locations) {
    return { type: types.LOAD_LOCATIONS_SUCCESS, locations: locations };
}

export function deleteLocationsSuccess(location) {
    return { type: types.DELETE_LOCATION_SUCCESS, location: location };
}

export function loadLocations() {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        return LocationApi.getAllLocations()
            .then((locations) => {
                dispatch(loadLocationsSuccess(locations));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}

export function saveLocation(location) {
    return function (dispatch/*, getState*/) {
        dispatch(beginAjaxCall());
        return LocationApi.saveLocation(location)
            .then((savedLocation) => {
                location.id ? dispatch(updateLocationSuccess(savedLocation)) :
                    dispatch(createLocationSuccess(savedLocation));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}

export function deleteLocation(location) {
    return function (dispatch/*, getState*/) {
        dispatch(beginAjaxCall());

        return LocationApi.deleteLocation(location.id)
            .then(() => {
                dispatch(deleteLocationsSuccess(location));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}