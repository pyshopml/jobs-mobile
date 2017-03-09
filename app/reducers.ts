import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import navigatorReducer from './containers/Navigator/reducer';


export default combineReducers({
  global: (state, action) => ({
    app: appReducer(state.app, action),
    navigator: navigatorReducer(state.navigator, action),
  })
});
