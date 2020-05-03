import React, { useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Home from '../views/Home/Home';
import Venues from '../views/Venues/Venues';
import Teams from '../views/Teams/Teams';
import NewGameCreation from '../components/NewGameCreation/NewGameCreation';
import HeaderNav from '../components/HeaderNav/HeaderNav';
import './App.scss';

import {
  connectToDB,
  setRouteName
} from '../actions';

const theme = {
  primary: {
    color: '#272932',
    hover: '#575C70'
  },
  secondary: {
    color: '#173753',
    hover: '#1F4A70'
  },
  error: {
    color: '#DF2935',
    hover: '#F92533'
  },
  success: {
    color: '#0B9647',
    hover: '#0DC45C'
  },
  generic: {
    color: '#ED9B40',
    hover: '#FFB056'
  },
  disabled: {
    bgColor: '#555',
    color: '#fff'
  },
  font: 'Roboto, sans-serif'
}


function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const connectDB = useCallback(() => dispatch(connectToDB()), [dispatch]);
  const setCurrentRoute = useCallback((route) => dispatch(setRouteName(route)), [dispatch]);

  useEffect(() => {
    connectDB();
    setCurrentRoute(history.location.pathname);
    const unlisten = history.listen((location) => {
      setCurrentRoute(location.pathname);
    });
    return () => {
      unlisten();
    }
  }, [connectDB, history, setCurrentRoute]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HeaderNav />
        <main className="mainContent">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/venues" render={() => <Venues />} />
            <Route exact path="/teams" render={() => <Teams />} />
            <Route exact path="/newgame" render={() => <NewGameCreation />} />
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
