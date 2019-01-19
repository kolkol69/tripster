import {TUNNEL_ADDRESS} from '../../tunnel_address';
import {
  FETCH_FOLLOWERS_BEGIN,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE
} from './actionTypes';

export function fetchFollowers(userId) {
    return dispatch => {
      dispatch(fetchFollowersBegin());
      return fetch(`http://${TUNNEL_ADDRESS}.ngrok.io/user/${userId}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          dispatch(fetchFollowersSuccess(json));
          return json;
        })
        .catch(error => dispatch(fetchFollowersFailure(error)));
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }


export const fetchFollowersBegin = () => ({
  type: FETCH_FOLLOWERS_BEGIN
});

export const fetchFollowersSuccess = users => ({
  type: FETCH_FOLLOWERS_SUCCESS,
  payload: { users }});

export const fetchFollowersFailure = error => ({
  type: FETCH_FOLLOWERS_FAILURE,
  payload: { error }
});

