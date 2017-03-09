import {
  LOAD_POST,
  LOAD_POST_SUCCEEDED,
  LOAD_POST_FAILURE
} from './constants';
import IPost from "types/post.interface";

interface IState{
  openedPost: IPost
}

const initialModel = {
  openedPost: null,
};

export default (state: IState = initialModel, action) => {
  switch (action.type) {
    case LOAD_POST_SUCCEEDED:
      return Object.assign({}, state, {openedPost: action.data.post});
    case LOAD_POST:
      return Object.assign({}, state, {openedPost: null});
    default:
      return state;
  }
}