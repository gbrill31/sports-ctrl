import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import Home from './components/Home/Home';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact peth="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
