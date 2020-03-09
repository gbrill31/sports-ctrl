import {
  VENUES
} from '../constants';

export const getAllVenues = () => ({
  type: VENUES.GET_VENUES_PENDING
});

export const setVenues = venues => ({
  type: VENUES.GET_VENUES_SUCCESS,
  payload: venues
});

export const venuesError = error => ({
  type: VENUES.GET_VENUES_FAILED,
  payload: error
})

export const createNewVenue = venue => ({
  type: VENUES.SAVE_PENDING,
  venue
});

export const setNewVenue = venue => ({
  type: VENUES.SAVE_SUCCESS,
  payload: venue
});

export const newVenueError = error => ({
  type: VENUES.SAVE_FAILED,
  payload: error
});