import { takeEvery, call, put } from 'redux-saga/effects';

import { VENUES } from '../constants';
import {
  setVenues, venuesError, setNewVenue, newVenueError, clearDeletedVenue, deleteVenueError
} from '../actions';
import { getAllVenues, saveNewVenue, deleteVenue } from '../api';

function* handleVenuesRequest() {
  try {
    const venues = yield call(getAllVenues);
    yield put(setVenues(venues));
  } catch (error) {
    yield put(venuesError(error));
  }
}

function* handleNewVenue({ venue }) {
  try {
    const newVenue = yield call(saveNewVenue, venue);
    yield put(setNewVenue(newVenue));
  } catch (error) {
    yield put(newVenueError(error));
  }
}

function* handleDeleteVenue({ id }) {
  try {
    const deletedVenueId = yield call(deleteVenue, id);
    yield put(clearDeletedVenue(deletedVenueId));
  } catch (error) {
    yield put(deleteVenueError(error));
  }
}

export default function* watchVenues() {
  yield takeEvery(VENUES.GET_VENUES_PENDING, handleVenuesRequest);
  yield takeEvery(VENUES.DELETE_PENDING, handleDeleteVenue);
  yield takeEvery(VENUES.SAVE_PENDING, handleNewVenue);
}