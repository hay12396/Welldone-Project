import * as types from './actionTypes';
import CategoryApi from '../api/mockCategoryApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function createCategory(category) {
    return { type: types.CREATE_CATEGORY, category: category };
}

export function loadCategoriesSuccess(categories) {//indicates that the call was successfully returned.
    return { type: types.LOAD_CATEGORIES_SUCCESS, categories: categories };
}

export function createCategorySuccess(category) {
    return { type: types.CREATE_CATEGORY_SUCCESS, category: category };
}

export function updateCategorySuccess(category) {
    return { type: types.UPDATE_CATEGORY_SUCCESS, category: category };
}

export function deleteCategorySuccess(category) {
    return { type: types.DELETE_CATEGORY_SUCCESS, category: category };
}

export function loadCategories() {
    return function (dispatch) {//every thunk returns a function that accept a dispach.
        dispatch(beginAjaxCall());

        return CategoryApi.getAllCategories()
            .then((categories) => {
                dispatch(loadCategoriesSuccess(categories));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}

export function saveCategory(category) {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        return CategoryApi.saveCategory(category)
            .then((category) => {
                category.id ? dispatch(updateCategorySuccess(category)) :
                    dispatch(createCategorySuccess(category));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}

export function deleteCategory(category) {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        return CategoryApi.deleteCategory(category.id)
            .then(() => {
                dispatch(deleteCategorySuccess(category));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}