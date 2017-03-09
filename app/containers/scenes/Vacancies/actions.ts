import IAction from 'types/action.interface';
import {fetchPosts, fetchMorePosts} from './api';
import selectors from './selectors';

import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_MORE_POSTS,
  LOAD_MORE_POSTS_SUCCEEDED,
  LOAD_FAILED,
} from './constants';


const loadingSucceeded = (data): IAction => ({
  type: LOAD_POSTS_SUCCEEDED,
  data
});

const loadingFailed = (errorMessage: string): IAction => ({
  type: LOAD_FAILED,
  errorMessage
});

const loadingMorePosts = (): IAction => ({
  type: LOAD_MORE_POSTS,
});

const loadingMorePostsSucceeded = (data): IAction => ({
  type: LOAD_MORE_POSTS_SUCCEEDED,
  data,
});

const loadingMorePostsFailed = (errorMessage): IAction => ({
  type: LOAD_FAILED,
  errorMessage,
});

export const loadPosts = () =>
  (dispatch: (action: IAction) => IAction) => {
    dispatch({type: LOAD_POSTS});
    fetchPosts(
      (data) => dispatch(loadingSucceeded(data)),
      (msg: string) => dispatch(loadingFailed(msg)),
    );
  }

export const loadMorePosts = () =>
  (dispatch: (action: IAction) => any, getState) => {
    const state = selectors(getState());
    dispatch(loadingMorePosts())
    fetchMorePosts(
      state.nextPage,
      (data) => dispatch(loadingMorePostsSucceeded(data)),
      (msg: string) => dispatch(loadingMorePostsFailed(msg)),
    );
  }