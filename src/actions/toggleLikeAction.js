import {
    TUNNEL_ADDRESS
} from '../../tunnel_address';
import {
    FETCH_TOGGLE_LIKE_BEGIN,
    FETCH_TOGGLE_LIKE_SUCCESS,
    FETCH_TOGGLE_LIKE_FAILURE,
} from '../actions/actionTypes';
import {
    fetchUsers
} from './fetchUsersAction';

export function fetchLike() {
    const uid = 0;
    const postId = 0;
    return dispatch => {
        dispatch(fetchLikeBegin());
        return fetch(`http://${TUNNEL_ADDRESS}.ngrok.io/update/likes/0/post/0`)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchLikeSuccess());
                dispatch(fetchUsers(11111));
                return json;
            })
            .catch(error => dispatch(fetchLikeFailure(error)));
    };
}

// Handle HTTP errors since fetch won't.
const handleErrors = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


export const fetchLikeBegin = () => ({
    type: FETCH_TOGGLE_LIKE_BEGIN
});

export const fetchLikeSuccess = () => ({
    type: FETCH_TOGGLE_LIKE_SUCCESS,
});

export const fetchLikeFailure = error => ({
    type: FETCH_TOGGLE_LIKE_FAILURE,
    payload: {
        error
    }
});