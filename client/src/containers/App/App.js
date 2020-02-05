import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import GameControl from '../GameControl/GameControl';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import './App.scss';

import {
  connectToDB,
  checkDbConnection,
  setRouteName
} from '../../actions/AppActions';


const mapStateToProps = state => {
  return {
    isConnecting: state.dbConnection.isPending,
    isDBConnected: state.dbConnection.isConnected,
    connectionError: state.dbConnection.error,
    currentRoute: state.routes.currentRoute
  }
};

const mapDispatchToProps = dispatch => ({
  connectDB: () => dispatch(connectToDB()),
  checkIsDbConnected: () => dispatch(checkDbConnection()),
  setCurrentRoute: (route) => dispatch(setRouteName(route))
});

function App({
  connectDB, checkIsDbConnected, isDBConnected, isConnecting, history,
  setCurrentRoute, connectionError
}) {

  useEffect(() => {
    checkIsDbConnected();
    const unlisten = history.listen((location) => {
      setCurrentRoute(location.pathname);
    });
    return () => {
      unlisten();
    }
  }, [checkIsDbConnected, history, setCurrentRoute]);

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
