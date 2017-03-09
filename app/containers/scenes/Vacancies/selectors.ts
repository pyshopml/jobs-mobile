import { createSelector } from 'reselect';

const postsSelectors = state => state.global.vacancies;

export default createSelector(
  postsSelectors,
  (substate) => substate
);