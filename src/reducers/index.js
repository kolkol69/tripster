// root reducer
import {combineReducers} from 'redux';
import fetchUsersReducer from './fetchUsersReducer';
import fetchFollowersReducer from './fetchFollowersReducer';
import fetchToggleLikeReducer from './fetchToggleLikePost';

const rootReducer = combineReducers({
    fetchedUsers: fetchUsersReducer,
    fetchedLikes: fetchToggleLikeReducer,
    fetchedFollowers: fetchFollowersReducer,
});

export default rootReducer;