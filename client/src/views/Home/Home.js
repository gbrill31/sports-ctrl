import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Venues from '../VenuesManagement/VenuesManagement';
import Teams from '../TeamsManagement/TeamsManagement';
import GameManagement from '../GameManagement/GameManagement';
import CreateGameForm from '../../components/CreateGameForm/CreateGameForm';

import HomeGamesList from '../../components/HomeGamesList/HomeGamesList';

function Home() {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <HomeGamesList />} />
        <Route exact path="/venues" render={() => <Venues />} />
        <Route exact path="/teams" render={() => <Teams />} />
        <Route exact path="/creategame" render={() => <CreateGameForm />} />
        <Route exact path="/game" render={() => <GameManagement />} />
      </Switch>
    </>
  );
}

export default Home;
