import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function photoReducers(state = initialState.likes, action) {
    switch (action.type) {
        case types.LIKE_POST_SUCCESS:
            return state + 1;
        default:
            return state;
    }
}
