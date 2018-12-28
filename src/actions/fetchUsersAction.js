import {TUNNEL_ADDRESS} from '../../tunnel_address';
import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE
} from './actionTypes';

export function fetchUsers(userId) {
    return dispatch => {
      dispatch(fetchUsersBegin());
      return fetch(`http://${TUNNEL_ADDRESS}.ngrok.io/user/${userId}`)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          // console.log('>>>>RESPONSE:', Object.keys(json));
          dispatch(fetchUsersSuccess(json));
          return json;
        })
        .catch(error => dispatch(fetchUsersFailure(error)));
    };
  }
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }


export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users }});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
});