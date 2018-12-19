import * as types from '../actions/actionTypes';

const initialState = {
    likes: 0,
}

export default function likeReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIKE_POST_SUCCESS:
            return {
                ...state,
                likes: state.likes +1
            }
        default:
            return state;
    }
}
