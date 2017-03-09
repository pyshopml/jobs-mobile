import { createSelector } from 'reselect';

const selectSubstate = state => state.global.navigator;

export default createSelector(
  selectSubstate,
  (substate) => substate
)