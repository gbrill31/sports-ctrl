import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import TeamGameControl from '../../components/ActiveGameContol/TeamGameControl/TeamGameControl';

import GameControlMenu from '../../components/ActiveGameContol/GameControlMenu';
import GameStateControl from '../../components/ActiveGameContol/GameStateControl';
import SetPlayerStats from '../../components/ActiveGameContol/SetPlayerStats/SetPlayerStats';
import PromptDialog from '../../components/PromptDialog/PromptDialog';
import useActiveGame from '../../hooks/reactQuery/useActiveGame';

import { GridContainer } from '../../styledElements';

import {
  setGame,
  setEndGamePrompt,
  updateGameEnd,
  setGameSelectedPlayer,
  setIsPlayerStatsDialog,
} from '../../redux';
import ModalDialog from '../../components/ModalDialog/ModalDialog';
import { useQueryClient } from 'react-query';
import useLeague from '../../hooks/reactQuery/useLeague';

export default function GameManagement() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    homeTeam,
    awayTeam,
    homePoints,
    awayPoints,
    homeFouls,
    awayFouls,
    homeTimeouts,
    awayTimeouts,
    isEndGamePrompt,
    isEndGamePending,
    setPlayerStatsPending: isSaving,
    isSetPlayerStatsDialog,
    selectedPlayer,
  } = useSelector((state) => state.game);

  const { leagueId, isHomeTimeout, isAwayTimeout } = useSelector(
    (state) => state.game
  );

  const { data: league } = useLeague(leagueId);

  const {
    status: activeGameStatus,
    data: activeGame,
    isFetching: isActiveGameFetching,
  } = useActiveGame(queryClient.getQueryData('dbConnection') !== undefined);

  const isGameLoading = () => {
    return activeGameStatus === 'loading' || isActiveGameFetching;
  };

  const setActiveGame = useCallback((game) => dispatch(setGame(game)), [
    dispatch,
  ]);

  const closeEndGamePrompt = useCallback(
    () => dispatch(setEndGamePrompt(false)),
    [dispatch]
  );

  const endGame = useCallback(() => dispatch(updateGameEnd(activeGame?.id)), [
    dispatch,
    activeGame,
  ]);

  const clearSelectedPlayer = useCallback(
    () => dispatch(setGameSelectedPlayer(null)),
    [dispatch]
  );
  const closeDialog = useCallback(
    () => dispatch(setIsPlayerStatsDialog(false)),
    [dispatch]
  );

  const cancelSetPlayerStats = () => {
    clearSelectedPlayer();
    closeDialog();
  };

  useEffect(() => {
    if (activeGame) {
      setActiveGame(activeGame);
    }
  }, [activeGame, setActiveGame]);

  return (
    <>
      <ComponentLoader loading={isGameLoading()}>
        <>
          {activeGame && league && (
            <>
              <GameControlMenu />
              <GridContainer columnsSpread="auto auto auto" noPadding>
                <GameStateControl league={league} />
                <TeamGameControl
                  teamLocation="home"
                  team={homeTeam}
                  points={homePoints}
                  fouls={homeFouls}
                  timeouts={homeTimeouts}
                  gameId={activeGame?.id}
                  league={league}
                  isTimeout={isHomeTimeout}
                  borderRight
                />
                <TeamGameControl
                  teamLocation="away"
                  team={awayTeam}
                  points={awayPoints}
                  fouls={awayFouls}
                  timeouts={awayTimeouts}
                  gameId={activeGame?.id}
                  isTimeout={isAwayTimeout}
                  league={league}
                />
              </GridContainer>
            </>
          )}
        </>
      </ComponentLoader>
      <ModalDialog
        component={SetPlayerStats}
        componentProps={{ league }}
        isOpen={isSetPlayerStatsDialog}
        handleCancel={cancelSetPlayerStats}
        title={`Set Player Game Stats - ${selectedPlayer?.team}`}
        label="set player stats"
        saving={isSaving}
      />
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
    </>
  );
}
