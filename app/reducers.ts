import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import navigatorReducer from './containers/Navigator/reducer';
import vacanciesReducer from './containers/scenes/Vacancies/reducer';

export default combineReducers({
  global: (state: any = {}, action) => ({
    app: appReducer(state.app, action),
    navigator: navigatorReducer(state.navigator, action),
    vacancies: vacanciesReducer(state.vacancies, action),
  })
});
