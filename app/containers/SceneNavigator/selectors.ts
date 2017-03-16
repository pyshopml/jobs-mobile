import { createSelector } from 'reselect';

const selectSubstate = state => state.global.navigator;
const selectIsAuth = state => state.global.auth.isAuth;

export default createSelector(
  selectSubstate,
  selectIsAuth,
  (substate, isAuth) => ({...substate, isAuth})
)