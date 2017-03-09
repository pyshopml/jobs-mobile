import {
  LOAD_POSTS,
  LOAD_POSTS_SUCCEEDED,
  LOAD_MORE_POSTS_SUCCEEDED,
  LOAD_FAILED,
} from './constants';

import IPost from 'types/post.interface';

interface IState{
  allPosts: IPost[];
  errorMessage: string;
  nextPage: string;
}

const initialModel = {
  allPosts: new Array<IPost>(),
  errorMessage: '',
  nextPage: '',
};

export default (state: IState = initialModel, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return state;

    case LOAD_POSTS_SUCCEEDED:
      return Object.assign(
        {},
        state,
        { allPosts: action.data.results, nextPage: action.data.next }
      );

    case LOAD_MORE_POSTS_SUCCEEDED:
      return Object.assign(
        {},
        state,
        { allPosts: state.allPosts.concat(action.data.results), nextPage: action.data.next }
      );

    case LOAD_FAILED:
      return Object.assign({}, state, { errorMessage: action.errorMessage });

    default:
      return state;
  }
}