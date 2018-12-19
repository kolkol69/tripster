import * as types from './actionTypes';

export const likePost = () => (
    {
      type: types.LIKE_POST_SUCCESS,
    }
  );
  
export const dislikePost = () => (
  {
    type: types.DISLIKE_POST_SUCCESS,
  }
);