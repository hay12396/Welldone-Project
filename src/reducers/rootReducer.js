import ajaxCallsInProgress from './ajaxStatusReducer';
import { combineReducers } from 'redux';
import locations from './locationReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({
    locations,
    categories,
    ajaxCallsInProgress
});

export default rootReducer;