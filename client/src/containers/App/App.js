import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import GameControl from '../GameControl/GameControl';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import './App.scss';

import {
  connectToDB,
  setRouteName
} from '../../actions';


const mapStateToProps = state => {
  return {
    isConnecting: state.db.isPending,
    isDBConnected: state.db.isConnected,
    connectionError: state.db.error,
    currentRoute: state.routes.currentRoute
  }
};

const mapDispatchToProps = dispatch => ({
  connectDB: () => dispatch(connectToDB()),
  setCurrentRoute: route => dispatch(setRouteName(route))
});

function App({
  connectDB, isDBConnected, isConnecting, history,
  setCurrentRoute, connectionError
}) {

  useEffect(() => {
    connectDB();
    const unlisten = history.listen((location) => {
      setCurrentRoute(location.pathname);
    });
    return () => {
      unlisten();
    }
  }, [connectDB, history, setCurrentRoute]);

  return (
    <div className="App">
      <HeaderNav
        isDbConnected={isDBConnected}
        isConnecting={isConnecting}
        handleConnect={connectDB}
      />
      <main>
        <Switch>
          <Route exact path="/" render={() => <Home isDbConnected={isDBConnected} />} />
          <Route exact path="/game" render={() => <GameControl />} />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
