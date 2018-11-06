// root reducer
import {combineReducers} from 'redux';
import photoActivity from './photoActivity';

const rootReducer = combineReducers({
    photoActivity,
});

export default rootReducer;