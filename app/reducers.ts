import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import navigatorReducer from './containers/SceneNavigator/reducer';
import vacanciesReducer from './containers/scenes/Vacancies/reducer';
import vacancyDetailReducer from './containers/scenes/VacancyDetail/reducer';

export default combineReducers({
  global: (state: any = {}, action) => ({
    app: appReducer(state.app, action),
    navigator: navigatorReducer(state.navigator, action),
    vacancies: vacanciesReducer(state.vacancies, action),
    vacancyDetail: vacancyDetailReducer(state.navigator, action),
  })
});
