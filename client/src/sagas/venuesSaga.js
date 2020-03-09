import { takeEvery, call, put, fork, take } from 'redux-saga/effects';

import { VENUES } from '../constants';
import { setVenues, venuesError, setNewVenue, newVenueError } from '../actions';
import { getAllVenues, createNewVenue } from '../api';

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
    const newVenue = yield call(createNewVenue, venue);
    yield put(setNewVenue(newVenue));
  } catch (error) {
    yield put(newVenueError(error));
  }
}

export default function* watchVenues() {
  yield takeEvery(VENUES.GET_VENUES_PENDING, handleVenuesRequest);
  const venue = yield take(VENUES.SAVE_PENDING);
  yield fork(handleNewVenue, venue);
}