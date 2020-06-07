import React from 'react';
import styled from 'styled-components';

import PlayerStatsItem from '../PlayerStatsItem/PlayerStatsItem';
import {
  MainTitle, FlexContainer, ScrollableContainer
} from '../../../styledElements';

const ScoreContainer = styled.div`
  color: #fff;
  font-size: 5rem;
  font-weight: bold;
  margin: 0 10px;
  text-align: center;
`;

export default function TeamGameControl({ teamLocation, team, borderRight, points, gameId }) {

  return (
    <div>
      <FlexContainer justify="center">
        <MainTitle soft uppercase>{teamLocation}</MainTitle>
      </FlexContainer>
      <ScoreContainer>
        {points}
      </ScoreContainer>
      <MainTitle align="center" capitalize>{team.getName()}</MainTitle>
      <ScrollableContainer heightDiff={420} fullWidth>
        <FlexContainer column align="center" minWidth="50vw" borderRight={borderRight}>
          {
            team.getPlayers()
              .map(player => (
                <PlayerStatsItem key={player.getId()} player={player} gameId={gameId} />
              ))
          }
        </FlexContainer>
      </ScrollableContainer>
    </div>
  )
}
