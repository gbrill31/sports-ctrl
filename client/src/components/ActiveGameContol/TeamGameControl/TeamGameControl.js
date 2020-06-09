import React from 'react';
import styled from 'styled-components';

import PlayerControlItem from '../PlayerControlItem/PlayerControlItem';
import {
  MainTitle, FlexContainer, ScrollableContainer
} from '../../../styledElements';

const TeamControlContainer = styled.div`
  padding: 0 15px 0 0;
`;

const ScoreContainer = styled.div`
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  margin: 0 10px;
  text-align: center;
`;

const FoulsContainer = styled.div`
  color: ${props => props.danger ? props.theme.error.color : '#fff'};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 5px;
  text-align: center;
`;

export default function TeamGameControl({ teamLocation, team, borderRight, points, fouls, gameId }) {

  return (
    <TeamControlContainer>
      <FlexContainer justify="center">
        <MainTitle soft uppercase>{teamLocation}</MainTitle>
      </FlexContainer>
      <MainTitle align="center" capitalize>{team.getName()}</MainTitle>
      <FoulsContainer danger={fouls > 3}>
        {`${fouls} Team Fouls`}
      </FoulsContainer>
      <ScoreContainer>
        {`Scored: ${points}`}
      </ScoreContainer>
      <ScrollableContainer heightDiff={350} fullWidth>
        <FlexContainer column align="center" borderRight={borderRight}>
          {
            team.getPlayers()
              .map(player => (
                <PlayerControlItem key={player.getId()} player={player} gameId={gameId} />
              ))
          }
        </FlexContainer>
      </ScrollableContainer>
    </TeamControlContainer>
  )
}
