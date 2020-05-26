import React, { useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled, { ThemeProvider } from 'styled-components';
import { HttpInterceptors } from './utils';
import Home from './views/Home/Home';
import Venues from './views/VenuesManagement/VenuesManagement';
import Teams from './views/TeamsManagement/TeamsManagement';
import GameManagement from './views/GameManagement/GameManagement';
import HeaderNav from './components/HeaderNav/HeaderNav';

import 'react-toastify/dist/ReactToastify.min.css';

import {
  connectToDB,
  setRouteName
} from './actions';


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
  menu: {
    color: '#A6A9AD',
    hover: '#E6EAEB'
  },
  disabled: {
    bgColor: '#555',
    color: '#888'
  },
  font: 'Roboto, sans-serif'
};

const AppContainer = styled.div`
  background-color: #272932;
  position: relative;
  width: 100vw;
  overflow: hidden;
`;

const AppMainContent = styled.main`
  padding-top: 100px;
  height: calc(100vh - 100px);
`;

toast.configure({
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 8000
});


function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const connectDB = useCallback(() => dispatch(connectToDB()), [dispatch]);
  const setCurrentRoute = useCallback((route) => dispatch(setRouteName(route)), [dispatch]);

  useEffect(() => {
    HttpInterceptors.initInterceptors(history);
    connectDB();
    setCurrentRoute(history.location.pathname);
    const unlisten = history.listen((location) => {
      setCurrentRoute(location.pathname);
    });

    return () => {
      HttpInterceptors.clearInterceptors();
      unlisten();
    }
  }, [connectDB, history, setCurrentRoute]);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <HeaderNav />
        <AppMainContent>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/venues" render={() => <Venues />} />
            <Route exact path="/teams" render={() => <Teams />} />
            <Route exact path="/game" render={() => <GameManagement />} />
          </Switch>
        </AppMainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
