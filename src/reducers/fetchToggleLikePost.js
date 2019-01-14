import {
    FETCH_TOGGLE_LIKE_BEGIN,
    FETCH_TOGGLE_LIKE_SUCCESS,
    FETCH_TOGGLE_LIKE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null
};

export default function fetchToggleLikeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TOGGLE_LIKE_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_TOGGLE_LIKE_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            // console.log('>>>> action.payload\n', action.payload.users, Object.keys(action.payload.users));
            return {
                ...state,
                loading: false,
            };

        case FETCH_TOGGLE_LIKE_FAILURE:
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
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}