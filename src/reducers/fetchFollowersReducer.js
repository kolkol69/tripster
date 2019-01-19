import {
  FETCH_FOLLOWERS_BEGIN,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE
} from '../actions/actionTypes';
  
  const initialState = {
    usersData: {},
    loading: false,
    error: null
  };
  
  export default function fetchFollowersReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_FOLLOWERS_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_FOLLOWERS_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        // console.log('>>>> action.payload\n', action.payload.users, Object.keys(action.payload.users));
        return {
          ...state,
          loading: false,
          usersData: action.payload.users
        };
  
      case FETCH_FOLLOWERS_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have items to display anymore, so set `items` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the items around!
        // Do whatever seems right for your use case.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          usersData: {}
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }