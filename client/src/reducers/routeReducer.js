import {
  ROUTE
} from '../constants';

const INITIAL_STATE = {
  routes: {
    currentRoute: ''
  }
}

export const routes = (state = INITIAL_STATE.routes, action = {}) => {
  switch (action.type) {
    case ROUTE.CHANGE:
      return { ...state, currentRoute: action.payload }
    default:
      return state;
  }
};
