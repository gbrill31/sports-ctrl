import {
  VENUES
} from '../constants';

const INTIAL_STATE = {
  items: [],
  getVenuesPending: false,
  getVenuesError: null,
  venueSavePending: false,
  venueSaveError: null
}

const venuesReducer = (state = INTIAL_STATE, action = {}) => {
  switch (action.type) {
    case VENUES.GET_VENUES_PENDING:
      return {
        ...state,
        getVenuesPending: true
      }
    case VENUES.GET_VENUES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        getVenuesError: null,
        getVenuesPending: false
      }
    case VENUES.GET_VENUES_FAILED:
      return {
        ...state,
        getVenuesError: action.payload,
        getVenuesPending: false
      }
    case VENUES.SAVE_PENDING:
      return {
        ...state,
        venueSavePending: true
      }
    case VENUES.SAVE_SUCCESS:
      return {
        ...state,
        venueSavePending: false,
        items: [...state.items, action.payload]
      }
    case VENUES.SAVE_FAILED:
      return {
        ...state,
        venueSavePending: false,
        venueSaveError: action.payload
      }
    default:
      return state;
  }
};

export default venuesReducer;
