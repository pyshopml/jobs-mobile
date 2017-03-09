import postsReducer from '../PostsListContainer/reducer';
import navigatorReducer from '../Navigator/reducer';
import postDetail from '../PostDetail/reducer';

import  { ADD_NOTIFICATION, REMOVE_FIRST_NOTIFICATION } from './constants';

const initialModel = {};

const appReducer = (state = initialModel, action) => {
  switch(action.type) {

    default:
      return state;
  }
};

export default (state: any = {}, action) => ({
  app: appReducer(state.app, action),
  navigator: navigatorReducer(state.navigator, action),
  postDetail: postDetail(state.postDetail, action),
  posts: postsReducer(state.posts, action),
});