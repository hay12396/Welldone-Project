import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function LocationReducer(state = initialState.locations, action) {
    switch (action.type) {
        case types.LOAD_LOCATIONS_SUCCESS:
            return action.locations;

        case types.CREATE_LOCATION_SUCCESS:
            return [...state, Object.assign({}, action.location)];

        case types.UPDATE_LOCATION_SUCCESS:
            return [
                ...state.filter(location => location.id !== action.location.id),
                Object.assign({}, action.location)];

        case types.DELETE_LOCATION_SUCCESS:
            return [
                ...state.filter(location => location.id !== action.location.id)];

        default:
            return state;
    }
}