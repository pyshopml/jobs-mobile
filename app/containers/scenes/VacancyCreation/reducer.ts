import IPost from 'types/post.interface';
import {
  UPLOAD_POST,
  UPLOAD_POST_SUCCEEDED,
  UPLOAD_POST_FAILURE
} from './constants';


interface NewPostModel {
  createdPost: IPost;
}

const initialModel: NewPostModel = {
  createdPost: null,
};

export default (state: NewPostModel = initialModel, action):NewPostModel => {
  switch (action.type) {

    case UPLOAD_POST:
      return state;

    case UPLOAD_POST_SUCCEEDED:
      return Object.assign({}, state, { createdPost: action.data.createdPost });

    default:
      return state;
  }
}