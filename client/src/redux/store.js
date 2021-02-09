import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';

import rootSaga from '../sagas';

const buildStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const isDev = process.env.NODE_ENV === 'development';

  const store = configureStore({
    reducer: rootReducer,
    middleware: () => [
      ...getDefaultMiddleware({ thunk: false }),
      sagaMiddleware,
    ],
    devTools: isDev,
  });

  sagaMiddleware.run(rootSaga);
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  }
  return store;
};

export default buildStore;
