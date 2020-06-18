import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import ComponentLoader from "../../components/ComponentLoader/ComponentLoader";
import CreateGameForm from "../../components/CreateGameForm/CreateGameForm";
import TeamGameControl from "../../components/ActiveGameContol/TeamGameControl/TeamGameControl";

import GameControlMenu from "../../components/ActiveGameContol/GameControlMenu";
import GameStateControl from "../../components/ActiveGameContol/GameStateControl";
import SetPlayerStatsDialog from "../../components/ActiveGameContol/SetPlayerStatsDialog/SetPlayerStatsDialog";
import PromptDialog from "../../components/PromptDialog/PromptDialog";
import useDb from "../../hooks/useDb";

import { GridContainer } from "../../styledElements";

import {
  getActiveGame,
  setGame,
  setEndGamePrompt,
  updateGameEnd,
} from "../../actions";

export default function GameManagement() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { status: dbStatus } = useDb();

  const {
    activeGamePending: isGameLoading,
    activeGameId,
    homeTeam,
    awayTeam,
    homePoints,
    awayPoints,
    homeFouls,
    awayFouls,
    isEndGamePrompt,
    isEndGamePending,
  } = useSelector((state) => state.game);

  const setActiveGame = useCallback((game) => dispatch(setGame(game)), [
    dispatch,
  ]);
  const loadActiveGame = useCallback(() => dispatch(getActiveGame()), [
    dispatch,
  ]);
  const closeEndGamePrompt = useCallback(
    () => dispatch(setEndGamePrompt(false)),
    [dispatch]
  );

  const endGame = useCallback(() => dispatch(updateGameEnd(activeGameId)), [
    dispatch,
    activeGameId,
  ]);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      if (location.pathName !== "/game") {
        setActiveGame(null);
      }
    });

    return () => {
      unlisten();
    };
  }, [setActiveGame, history]);

  useEffect(() => {
    if (dbStatus === "success" && !activeGameId) {
      loadActiveGame();
    }
  }, [loadActiveGame, activeGameId, dbStatus, setActiveGame]);

  return (
    <>
      <ComponentLoader loading={isGameLoading}>
        <>
          {!activeGameId ? (
            <CreateGameForm />
          ) : (
            <>
              <GameControlMenu />
              <GridContainer columnsSpread="auto auto auto" noPadding>
                <GameStateControl />
                <TeamGameControl
                  teamLocation="home"
                  team={homeTeam}
                  points={homePoints}
                  fouls={homeFouls}
                  gameId={activeGameId}
                  borderRight
                />

                <TeamGameControl
                  teamLocation="away"
                  team={awayTeam}
                  points={awayPoints}
                  fouls={awayFouls}
                  gameId={activeGameId}
                />
              </GridContainer>
              <SetPlayerStatsDialog />
            </>
          )}
        </>
      </ComponentLoader>
      {isEndGamePrompt && (
        <PromptDialog
          isOpen={isEndGamePrompt}
          title="End Active Game"
          content="Are you sure you want to end and close the current game?"
          confirmText="End"
          pendingTitle="Ending..."
          handleClose={closeEndGamePrompt}
          handleConfirm={endGame}
          isPending={isEndGamePending}
        />
      )}
    </>
  );
}
