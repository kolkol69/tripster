// root reducer
import {combineReducers} from 'redux';
import likeReducer from './likeReducer';

const rootReducer = combineReducers({
    likes: likeReducer,
});

export default rootReducer;