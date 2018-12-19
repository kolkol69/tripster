import * as types from '../actions/actionTypes';

const initialState = {
    likes: 0,
    isLiked: false,
}

export default function likeReducer(state = initialState, action) {
    switch (action.type) {
        case types.LIKE_POST_SUCCESS:
            return {
                ...state,
                isLiked: !state.isLiked,
                likes: state.isLiked ? state.likes -1 : state.likes +1, 
            }
        default:
            return state;
    }
}
