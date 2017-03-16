import { createSelector } from 'reselect';

const selectSubstate = state => state.global.app;
const selectNavigatorState = state => state.global.navigator.navigationState;
const selectIsAuth = state => state.global.auth.isAuth;


export default createSelector(
  selectSubstate,
  selectNavigatorState,
  selectIsAuth,
  (substate, navigationState, isAuth) => ({...substate, navigationState, isAuth})
)