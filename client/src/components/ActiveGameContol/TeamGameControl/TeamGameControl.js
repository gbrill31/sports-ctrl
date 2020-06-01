import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';


import PlayerStatsItem from '../PlayerStatsItem/PlayerStatsItem';
import {
  MainTitle, FlexContainer, ScrollableContainer
} from '../../../styledElements';

// import {
//   setIsPlayerStatsDialog,
//   setGameSelectedPlayer
// } from '../../../actions';



export default function TeamGameControl({ teamLocation, team, borderRight }) {
  // const dispatch = useDispatch();

  // const setSelectedPlayer = useCallback((player) => dispatch(setGameSelectedPlayer(player)), [dispatch]);
  // const openStatsDialog = useCallback(() => dispatch(setIsPlayerStatsDialog(true)), [dispatch]);

  // const openSetPlayerStats = player => () => {
  //   setSelectedPlayer(player);
  //   openStatsDialog();
  // }

  return (
    <div>
      <FlexContainer justify="center">
        <MainTitle soft uppercase>{teamLocation}</MainTitle>
      </FlexContainer>
      <MainTitle align="center" capitalize>{team.getName()}</MainTitle>
      <ScrollableContainer heightDiff={420} fullWidth>
        <FlexContainer column align="center" minWidth="600" borderRight={borderRight}>
          {
            team.getPlayers()
              .map(player => (
                <PlayerStatsItem key={player.getId()} player={player} />
              ))
          }
        </FlexContainer>
      </ScrollableContainer>
    </div>
  )
}
