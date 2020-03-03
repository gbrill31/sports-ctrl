import React, { useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from '../Home/Home';
import GameControl from '../GameControl/GameControl';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import './App.scss';

import {
  connectToDB,
  setRouteName
} from '../../actions';


function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  const connectDB = useCallback(() => dispatch(connectToDB()), [dispatch]);
  const setCurrentRoute = useCallback((route) => dispatch(setRouteName(route)), [dispatch]);

  useEffect(() => {
    // connectDB();
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
          <Route exact path="/game" render={() => <GameControl />} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
