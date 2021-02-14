import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './slices/authSlice';
import routesReducer from './slices/routesSlice';
import teamsReducer from './slices/teamsSlice';
import gameClockReducer from './slices/gameClockSlice';
import attackClockReducer from './slices/attackClockSlice';
import activeGamesReducer from './slices/gameControlSlice';

import rootSaga from './sagas';

const buildStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const isDev = process.env.NODE_ENV === 'development';

  const store = configureStore({
    reducer: combineReducers({
      game: activeGamesReducer,
      routes: routesReducer,
      teams: teamsReducer,
      gameClock: gameClockReducer,
      attackClock: attackClockReducer,
      auth: authReducer,
    }),
    middleware: () => [
      ...getDefaultMiddleware({ thunk: false }),
      sagaMiddleware,
    ],
    devTools: isDev,
  });

  sagaMiddleware.run(rootSaga);
  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./slices', () => store.replaceReducer(rootReducer));
  // }
  return store;
};

export default buildStore;
