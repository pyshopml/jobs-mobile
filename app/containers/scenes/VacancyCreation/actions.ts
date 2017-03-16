import INewPost from 'types/new_post.interface';
import { uploadPost } from './api';
import selectors from './selectors';
import { pushScene } from 'containers/SceneNavigator/actions';
import scenes from 'scenes';
import IAction from 'types/action.interface';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE,
} from './constants';

const submitPost = (): IAction => ({
  type: UPLOAD_POST,
});

const submitPostSucceeded = (createdPost): IAction => ({
  type: UPLOAD_POST_SUCCEEDED,
  data: {createdPost},
});

const submitPostFailed = (errorMessage: string): IAction => ({
  type: UPLOAD_POST_FAILURE,
  errorMessage
});

export const createPost = (post: INewPost) => (dispatch, getState) => {
  dispatch(submitPost());

  const state = selectors(getState())

  uploadPost(
    post,
    state.auth_token,
    (post: any) => {
      dispatch(submitPostSucceeded(post))
      dispatch(pushScene(scenes.vacancyDetail({postId: post.id})))
    },
    (msg: string) => {
      dispatch(submitPostFailed(msg))
    },
  )
}