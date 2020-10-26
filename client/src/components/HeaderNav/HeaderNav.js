import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import {
  faCheck,
  faDatabase,
  faPlus,
  faChevronLeft,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { Button, Icon } from '../../styledElements';
import useDb from '../../hooks/useDb';
import useActiveGame from '../../hooks/useActiveGame';

import { setEndGamePrompt, userLogout } from '../../actions';
import UserMenu from '../UserMenu/UserMenu';

const NavRootWrapper = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #c17a2b;
  padding: 10px;
  z-index: 999;
`;

function HeaderNav() {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentRoute = useSelector((state) => state.routes.currentRoute);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const {
    status: dbStatus,
    failureCount,
    refetch: connectDb,
    error: dbError,
  } = useDb();
  const {
    status: activeGameStatus,
    data: activeGame,
    refetch: fetchActiveGame,
  } = useActiveGame(dbStatus === 'success' && isLoggedIn);

  useEffect(() => {
    if (currentRoute === '/') {
      fetchActiveGame();
    }
  }, [currentRoute, fetchActiveGame]);

  const isDbConnected = () => dbStatus === 'success';
  const isDbConnecting = () => dbStatus === 'loading';

  const logout = useCallback(() => dispatch(userLogout()), [dispatch]);

  const openEndGamePrompt = useCallback(
    () => dispatch(setEndGamePrompt(true)),
    [dispatch]
  );

  const getConnectBtnColor = () => {
    return !dbError || isDbConnecting()
      ? isDbConnected()
        ? 'success'
        : 'secondary'
      : 'error';
  };
  const getConnectBtnText = () => {
    return isDbConnecting()
      ? `Connecting, Attempts ${failureCount}`
      : isDbConnected()
      ? 'DB Connected'
      : !dbError
      ? 'Connect to Database'
      : 'Connection Failed, Click To try Again';
  };

  const goToRoute = (route) => () => history.push(route);

  return (
    <NavRootWrapper>
      <UserMenu />
      <Button
        color={getConnectBtnColor()}
        // disabled={isDbConnecting()}
        onClick={connectDb}
        // isSaving={isDbConnecting()}
      >
        {getConnectBtnText()}
        {
          <Icon spaceLeft>
            {isDbConnected() ? (
              <FontAwesomeIcon icon={faCheck} size="sm" />
            ) : isDbConnecting() ? (
              <CircularProgress size={12} color="inherit" />
            ) : (
              <FontAwesomeIcon icon={faDatabase} size="sm" />
            )}
          </Icon>
        }
      </Button>
      {isDbConnected() &&
        isLoggedIn &&
        (currentRoute === '/' ? (
          <>
            <Button color="primary" onClick={goToRoute('/teams')}>
              Manage Teams
            </Button>
            <Button color="primary" onClick={goToRoute('/venues')}>
              Manage Venues
            </Button>

            {!activeGame && activeGameStatus === 'success' ? (
              <Button
                justifyRight
                color="primary"
                onClick={goToRoute('/creategame')}
              >
                Start A New Game
                <Icon spaceLeft>
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </Icon>
              </Button>
            ) : null}
            {currentRoute !== '/game' && isLoggedIn && (
              <Button justifyRight color="error" onClick={logout}>
                Logout
                <Icon spaceLeft>
                  <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
                </Icon>
              </Button>
            )}
          </>
        ) : (
          <>
            <Button color="secondary" onClick={goToRoute('/')}>
              <Icon spaceRight>
                <FontAwesomeIcon icon={faChevronLeft} size="sm" />
              </Icon>
              Home
            </Button>

            {currentRoute === '/game' && activeGame && (
              <Button justifyRight color="error" onClick={openEndGamePrompt}>
                End Game
                <Icon spaceLeft>
                  <FontAwesomeIcon icon={faCheck} size="sm" />
                </Icon>
              </Button>
            )}
          </>
        ))}
    </NavRootWrapper>
  );
}

export default HeaderNav;
