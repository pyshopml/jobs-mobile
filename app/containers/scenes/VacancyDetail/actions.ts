import IPost from "types/post.interface";
import IAction from "types/action.interface";
import { fetchPost } from './api';
import {
  LOAD_POST,
  LOAD_POST_SUCCEEDED,
  LOAD_POST_FAILURE
} from './constants';

const loadingPostSucceeded = (post: IPost): IAction => ({
  type: LOAD_POST_SUCCEEDED,
  data: { post }
});

const loadingPostFailed = (errorMessage: string): IAction => ({
  type: LOAD_POST_FAILURE,
  errorMessage
});

export const loadPost = (id: number) =>
  (dispatch) => {
    dispatch({ type: LOAD_POST });
    fetchPost(
      id,
      (post) => dispatch(loadingPostSucceeded(post)),
      (msg) => dispatch(loadingPostFailed(msg)),
      () => {alert(404)}
    )
  };
