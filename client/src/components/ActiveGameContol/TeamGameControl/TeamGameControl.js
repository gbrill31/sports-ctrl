import React from 'react';
import styled from 'styled-components';
import { faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFormInput from '../../../hooks/useFormInput';
import PlayerControlItem from '../PlayerControlItem/PlayerControlItem';
import {
  MainTitle, FlexContainer, ScrollableContainer, Input, ClearButton,
  ButtonIcon
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

  const filterPlayersInput = useFormInput('');

  const clearFilterPlayers = () => filterPlayersInput.setValue('');

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
      <FlexContainer justify="center" align="center" fullWidth>
        <FontAwesomeIcon icon={faFilter} size="sm" color="#666" />
        <FlexContainer padding="0" width="90%">
          <Input
            type="text"
            placeholder="Type Name or Number"
            value={filterPlayersInput.value}
            onChange={filterPlayersInput.onChange}
            color="#fff"
            width="100%"
          />
          <ClearButton
            color="#fff"
            show={filterPlayersInput.value.length > 0}
            onClick={clearFilterPlayers}
          >
            <ButtonIcon>
              <FontAwesomeIcon icon={faTimes} size="sm" />
            </ButtonIcon>
          </ClearButton>
        </FlexContainer>
      </FlexContainer>
      <ScrollableContainer heightDiff={420} fullWidth>
        <FlexContainer column align="center" borderRight={borderRight}>
          {
            team.getPlayers('name', filterPlayersInput.value)
              .map(player => (
                <PlayerControlItem key={player.getId()} player={player} gameId={gameId} />
              ))
          }
        </FlexContainer>
      </ScrollableContainer>
    </TeamControlContainer>
  )
}
