import React, { useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    <div className="App">
      <HeaderNav />
      <main>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/newgame" render={() => <NewGameCreation />} />
          <Route exact path="/venues" render={() => <Venues />} />
          <Route exact path="/teams" render={() => <Teams />} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
