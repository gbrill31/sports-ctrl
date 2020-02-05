import {
  ROUTE
} from '../constants';

export const setRouteName = route => ({
  type: ROUTE.CHANGE,
  payload: route
});