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

export const saveNewVenue = venue => ({
  type: VENUES.SAVE_PENDING,
  venue
});

export const deleteVenue = id => ({
  type: VENUES.DELETE_PENDING,
  id
});

export const clearDeletedVenue = id => ({
  type: VENUES.DELETE_SUCCESS,
  payload: id
});

export const deleteVenueError = error => ({
  type: VENUES.DELETE_FAILED,
  payload: error
});

export const setNewVenue = venue => ({
  type: VENUES.SAVE_SUCCESS,
  payload: venue
});

export const newVenueError = error => ({
  type: VENUES.SAVE_FAILED,
  payload: error
});

export const openNewVenueDialog = () => ({
  type: VENUES.OPEN_NEW_VENUE_DIALOG
});

export const closeNewVenueDialog = () => ({
  type: VENUES.CLOSE_NEW_VENUE_DIALOG
});