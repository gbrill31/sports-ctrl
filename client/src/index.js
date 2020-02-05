import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

import { routes } from './reducers/routeReducer';
import { dbConnection } from './reducers/dbReducer';
import { gamesPlayed } from './reducers/HomeReducers';
import { gameControl } from './reducers/GameControlReducers';

const rootReducer = combineReducers({ dbConnection, gamesPlayed, gameControl, routes });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
