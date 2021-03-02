import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PlayerGameControlItem from '../PlayerGameControlItem/PlayerGameControlItem';
import FilterListInput from '../../FilterListInput/FilterListInput';

import {
  SubTitle,
  FlexContainer,
  ScrollableContainer,
  Button,
  Icon,
} from '../../../styledElements';
import { CircularProgress } from '@material-ui/core';

import {
  setIsTimeout,
  startTimeoutClock,
  stopTimeoutClock,
  setIsTimeoutPrompt,
  updateTeamTimeouts,
} from '../../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandPaper,
  faHistory,
  faStopwatch,
} from '@fortawesome/free-solid-svg-icons';

const TeamControlContainer = styled.div`
  border-right: ${(props) => (props.borderRight ? '1px solid #777' : '')};
`;

const ScoreContainer = styled.div`
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  margin: 0 10px;
  text-align: center;
`;

const CountContainer = styled.div`
  color: ${(props) => (props.danger ? props.theme.error.color : '#fff')};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 5px;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function TeamGameControl({
  teamLocation,
  team,
  borderRight,
  points,
  fouls,
  timeouts,
  gameId,
  league,
  isTimeout,
  isTimeoutDisabled,
}) {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState('');

  const { isTimeoutClockRunning } = useSelector((state) => state.timeoutClock);

  const enableTimeout = useCallback(
    () => dispatch(setIsTimeout({ isTimeout: true, teamLocation })),
    [dispatch, teamLocation]
  );
  const startTimeout = useCallback(() => dispatch(startTimeoutClock()), [
    dispatch,
  ]);
  const stopTimeout = useCallback(() => dispatch(stopTimeoutClock()), [
    dispatch,
  ]);

  const updateTimeouts = useCallback(
    (val) =>
      dispatch(updateTeamTimeouts({ gameId, teamId: team.id, timeouts: val })),
    [dispatch, team, gameId]
  );

  const openTimeoutPrompt = useCallback(
    () => dispatch(setIsTimeoutPrompt(true)),
    [dispatch]
  );

  const handleTimeoutStart = () => {
    if (!isTimeout) updateTimeouts(timeouts + 1);
    enableTimeout();
    startTimeout();
  };

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
          player.name.includes(filterValue) ||
          player.number.toString().includes(filterValue)
      );
    }
    return players || [];
  };

  const getTeamFoulsLimit = () => league.maxTeamFoulsCount;
  const getTeamTimeoutsLimit = () => league.maxTimeoutCount;
  const getPlayerFoulsLimit = () => league.maxPlayerFoulsCount;
  const getTechFoulsLimit = () => league.maxTechFoulsCount;

  const getFoulsProgress = () =>
    Math.round((fouls / getTeamFoulsLimit()) * 100);

  const getTimeoutsProgress = () =>
    Math.round((timeouts / getTeamTimeoutsLimit()) * 100);

  const isTimeoutActive = () => isTimeout && isTimeoutClockRunning;

  return (
    team && (
      <TeamControlContainer borderRight={borderRight}>
        <FlexContainer column justify="center" align="center">
          <SubTitle soft uppercase>
            {teamLocation} - {team.name}
          </SubTitle>
        </FlexContainer>
        <FlexContainer justify="flex-start" align="center" fullWidth>
          <FlexContainer justify="center" align="center">
            <ScoreContainer>{`${points}pt`}</ScoreContainer>
          </FlexContainer>
          <FlexContainer justify="center" align="center">
            <h2 style={{ color: '#fff', margin: 0, marginRight: '10px' }}>
              Fouls
            </h2>
            <CountContainer danger={fouls > getTeamFoulsLimit() - 1}>
              <>
                <CircularProgress
                  style={{
                    border: '1px solid #f4f4f4',
                    borderRadius: '50%',
                  }}
                  variant="determinate"
                  color="inherit"
                  size={50}
                  value={getFoulsProgress()}
                />
                <div
                  style={{
                    top: '50%',
                    left: '50%',
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {fouls}
                </div>
              </>
            </CountContainer>
          </FlexContainer>
          <FlexContainer justify="center" align="center">
            <FlexContainer column align="center" justify="center">
              <h2 style={{ color: '#fff', margin: 0, marginRight: '10px' }}>
                Timeouts
              </h2>
              <FlexContainer align="center" justify="center">
                {!isTimeoutActive() ? (
                  <Button
                    onClick={handleTimeoutStart}
                    color="success"
                    disabled={
                      isTimeoutDisabled || timeouts >= getTeamTimeoutsLimit()
                    }
                  >
                    Timeout
                    <Icon spaceLeft>
                      <FontAwesomeIcon icon={faStopwatch} size="sm" />
                    </Icon>
                  </Button>
                ) : (
                  <Button onClick={stopTimeout} color="error">
                    Stop
                    <Icon spaceLeft>
                      <FontAwesomeIcon icon={faHandPaper} size="sm" />
                    </Icon>
                  </Button>
                )}

                {isTimeout && (
                  <Button onClick={openTimeoutPrompt} color="secondary">
                    Cancel
                    <Icon spaceLeft>
                      <FontAwesomeIcon icon={faHistory} size="sm" />
                    </Icon>
                  </Button>
                )}
              </FlexContainer>
            </FlexContainer>

            <CountContainer danger={fouls > getTeamFoulsLimit() - 1}>
              <CircularProgress
                style={{
                  border: '1px solid #f4f4f4',
                  borderRadius: '50%',
                }}
                variant="determinate"
                color="inherit"
                size={50}
                value={getTimeoutsProgress()}
              />
              <div
                style={{
                  top: '50%',
                  left: '50%',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {timeouts}
              </div>
            </CountContainer>
          </FlexContainer>
        </FlexContainer>
        <FilterListInput
          onChange={setFilterValue}
          placeholder="Type Name or Number"
        />
        <ScrollableContainer heightDiff={340} fullWidth>
          <FlexContainer column align="center">
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
