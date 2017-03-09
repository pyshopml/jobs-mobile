import { createSelector } from 'reselect';

const selectSubstate = state => state.global.app;
const selectNavigatorState = state => state.global.navigator.navigationState;


export default createSelector(
  selectSubstate,
  selectNavigatorState,
  (substate, navigationState) => ({...substate, navigationState})
)