import * as types from '../actions/actionTypes';

const initialState = {
    likes: 0,
}

export default function likeReducer(state = initialState.likes, action) {
    switch (action.type) {
        case types.LIKE_POST_SUCCESS:
            debugger;
            return {
                ...state,
                likes: state + 1,
            }
        default:
            return state;
    }
}
