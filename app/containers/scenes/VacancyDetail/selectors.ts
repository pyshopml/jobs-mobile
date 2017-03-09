import { createSelector } from 'reselect';

const selectSubstate = state => state.global.vacancyDetail;

export default createSelector(
  selectSubstate,
  (substate) => substate
)