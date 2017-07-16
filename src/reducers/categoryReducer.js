import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function CategoryReducer(state = initialState.categories, action) {
    switch (action.type) {
        case types.CREATE_CATEGORY_SUCCESS:
            return [...state,
            Object.assign({}, action.category)];

        case types.UPDATE_CATEGORY_SUCCESS:
            return [...state.filter((category) => category.id != action.category.id),
            Object.assign({}, action.category)];

        case types.DELETE_CATEGORY_SUCCESS:
            return [...state.filter((category) => category.id != action.category.id)];

        case types.LOAD_CATEGORIES_SUCCESS:
            return action.categories;

        default:
            return state;
    }
}