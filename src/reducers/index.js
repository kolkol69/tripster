// root reducer
import {combineReducers} from 'redux';
import likeReducer from './likeReducer';
import fetchUsersReducer from './fetchUsersReducer';

const rootReducer = combineReducers({
    likes: likeReducer,
    fetchedUsers: fetchUsersReducer,
});

export default rootReducer;