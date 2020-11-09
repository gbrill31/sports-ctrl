import { Switch, Route } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';

import Venues from '../VenuesManagement/VenuesManagement';
import Teams from '../TeamsManagement/TeamsManagement';
import GameManagement from '../GameManagement/GameManagement';
import CreateGameForm from '../../components/CreateGameForm/CreateGameForm';

import HomeGamesList from '../../components/HomeGamesList/HomeGamesList';
import PromptDialog from '../../components/PromptDialog/PromptDialog';
import { closeLogoutPrompt, userLogout } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import UsersManagement from '../UsersManagement/UsersManagement';
import { verifyLogin } from '../../actions';

function Home() {
  const dispatch = useDispatch();
  const { logoutPending, isLogoutPrompt } = useSelector((state) => state.auth);
  const { currentRoute } = useSelector((state) => state.routes);

  const logout = useCallback(() => dispatch(userLogout()), [dispatch]);
  const logoutPromptClose = useCallback(() => dispatch(closeLogoutPrompt()), [
    dispatch,
  ]);

  const verifyUserLogin = useCallback(() => dispatch(verifyLogin()), [
    dispatch,
  ]);

  useEffect(() => {
    verifyUserLogin();
  }, [currentRoute, verifyUserLogin]);

  const handleConfirmLogout = () => {
    logout();
    logoutPromptClose();
  };

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <HomeGamesList />} />
        <Route exact path="/users" render={() => <UsersManagement />} />
        <Route exact path="/venues" render={() => <Venues />} />
        <Route exact path="/teams" render={() => <Teams />} />
        <Route exact path="/creategame" render={() => <CreateGameForm />} />
        <Route exact path="/game" render={() => <GameManagement />} />
      </Switch>
      <PromptDialog
        isOpen={isLogoutPrompt}
        title="User Logout"
        content="Are you sure you want to logout?"
        confirmText="Logout"
        pendingTitle="Loging out..."
        handleClose={logoutPromptClose}
        handleConfirm={handleConfirmLogout}
        isPending={logoutPending}
      />
    </>
  );
}

export default Home;
