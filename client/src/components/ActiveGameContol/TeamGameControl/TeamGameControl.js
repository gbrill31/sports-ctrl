import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PlayerGameControlItem from '../PlayerGameControlItem/PlayerGameControlItem';
import FilterListInput from '../../FilterListInput/FilterListInput';

import {
  MainTitle,
  FlexContainer,
  ScrollableContainer,
} from '../../../styledElements';

const TeamControlContainer = styled.div`
  /* padding: 0 15px 0 0; */
`;

const ScoreContainer = styled.div`
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  margin: 0 10px;
  text-align: center;
`;

const FoulsContainer = styled.div`
  color: ${(props) => (props.danger ? props.theme.error.color : '#fff')};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 5px;
  text-align: center;
`;

function TeamGameControl({
  teamLocation,
  team,
  borderRight,
  points,
  fouls,
  gameId,
  league,
}) {
  const [filterValue, setFilterValue] = useState('');

  const getPlayers = (sortField, filterValue) => {
    let players = [...team.players];
    if (sortField) {
      players = players.sort((playerA, playerB) =>
        playerA[sortField] > playerB[sortField] ? 1 : -1
      );
    }
    if (filterValue !== '') {
      players = players.filter(
        (player) =>
          player.getName().includes(filterValue) ||
          player.getNumber().includes(filterValue)
      );
    }
    return players || [];
  };

  const getTeamFoulsLimit = () => league.maxTeamFoulsCount;
  const getPlayerFoulsLimit = () => league.maxPlayerFoulsCount;
  const getTechFoulsLimit = () => league.maxTechFoulsCount;

  return (
    team && (
      <TeamControlContainer>
        <FlexContainer column justify="center" align="center">
          <MainTitle soft uppercase>
            {teamLocation}
          </MainTitle>
          <ScoreContainer>{`${points}pt`}</ScoreContainer>
        </FlexContainer>
        <MainTitle align="center" capitalize>
          {team.name}
        </MainTitle>
        <FoulsContainer danger={fouls > getTeamFoulsLimit() - 1}>
          {`Team Fouls: ${fouls}`}
        </FoulsContainer>

        <FilterListInput
          onChange={setFilterValue}
          placeholder="Type Name or Number"
        />
        <ScrollableContainer heightDiff={370} fullWidth>
          <FlexContainer column align="center" borderRight={borderRight}>
            {getPlayers('name', filterValue).map((player) => (
              <PlayerGameControlItem
                key={player.id}
                player={player}
                gameId={gameId}
                maxFouls={getPlayerFoulsLimit()}
                maxTechFouls={getTechFoulsLimit()}
                roundLeft={teamLocation === 'home'}
              />
            ))}
          </FlexContainer>
        </ScrollableContainer>
      </TeamControlContainer>
    )
  );
}

TeamGameControl.propTypes = {
  teamLocation: PropTypes.string.isRequired,
  team: PropTypes.object.isRequired,
  league: PropTypes.object.isRequired,
  borderRight: PropTypes.bool,
  points: PropTypes.number.isRequired,
  fouls: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
};

export default React.memo(TeamGameControl);
