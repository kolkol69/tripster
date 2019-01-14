// root reducer
import {combineReducers} from 'redux';
import fetchUsersReducer from './fetchUsersReducer';
import fetchToggleLikeReducer from './fetchToggleLikePost';

const rootReducer = combineReducers({
    fetchedUsers: fetchUsersReducer,
    fetchedLikes: fetchToggleLikeReducer,
});

export default rootReducer;