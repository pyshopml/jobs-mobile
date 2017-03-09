import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';


export default combineReducers({
  global: (state, action) => ({
    app: appReducer(state.app, action),
  })
});
