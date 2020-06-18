import React, { useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import {
  faCheck,
  faDatabase,
  faPlus,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { Button, ButtonIcon } from "../../styledElements";
import useDb from "../../hooks/useDb";

import { setEndGamePrompt } from "../../actions";

const NavRootWrapper = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #c17a2b;
  padding: 5px;
  z-index: 999;
`;

const NavContentWrapper = styled.div`
  position: relative;
  margin: 10px;
`;

function HeaderNav() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { status: dbStatus, failureCount, refetch, error: dbError } = useDb();

  const currentRoute = useSelector((state) => state.routes.currentRoute);

  const activeGame = useSelector((state) => state.games.active);
  const activeGameId = useSelector((state) => state.game.activeGameId);

  const isDbConnected = () => dbStatus === "success";
  const isDbConnecting = () => dbStatus === "loading";

  const openEndGamePrompt = useCallback(
    () => dispatch(setEndGamePrompt(true)),
    [dispatch]
  );

  const getConnectBtnColor = () => {
    return !dbError || isDbConnecting()
      ? isDbConnected()
        ? "success"
        : "secondary"
      : "error";
  };
  const getConnectBtnText = () => {
    return isDbConnecting()
      ? `Connecting, Attempts ${failureCount}`
      : isDbConnected()
      ? "DB Connected"
      : !dbError
      ? "Connect to Database"
      : "Connection Failed, Click To try Again";
  };

  const goToRoute = (route) => () => history.push(route);

  return (
    <NavRootWrapper>
      <NavContentWrapper>
        <Button
          color={getConnectBtnColor()}
          // disabled={isDbConnecting()}
          onClick={refetch}
          // isSaving={isDbConnecting()}
        >
          {getConnectBtnText()}
          {
            <ButtonIcon spaceLeft>
              {isDbConnected() ? (
                <FontAwesomeIcon icon={faCheck} size="sm" />
              ) : isDbConnecting() ? (
                <CircularProgress size={12} color="inherit" />
              ) : (
                <FontAwesomeIcon icon={faDatabase} size="sm" />
              )}
            </ButtonIcon>
          }
        </Button>
      </NavContentWrapper>
      {isDbConnected() &&
        (currentRoute === "/" ? (
          <Fragment>
            <Button color="primary" onClick={goToRoute("/teams")}>
              Manage Teams
            </Button>
            <Button color="primary" onClick={goToRoute("/venues")}>
              Manage Venues
            </Button>
            {!activeGame ? (
              <Button justifyRight color="primary" onClick={goToRoute("/game")}>
                Start A New Game
                <ButtonIcon spaceLeft>
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </ButtonIcon>
              </Button>
            ) : null}
          </Fragment>
        ) : (
          <>
            <Button color="secondary" onClick={goToRoute("/")}>
              <ButtonIcon spaceRight>
                <FontAwesomeIcon icon={faChevronLeft} size="sm" />
              </ButtonIcon>
              Home
            </Button>
            {currentRoute === "/game" && activeGameId && (
              <Button justifyRight color="error" onClick={openEndGamePrompt}>
                End Game
                <ButtonIcon spaceLeft>
                  <FontAwesomeIcon icon={faCheck} size="sm" />
                </ButtonIcon>
              </Button>
            )}
          </>
        ))}
    </NavRootWrapper>
  );
}

export default HeaderNav;
