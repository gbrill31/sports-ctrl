import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ComponentLoader from '../../ComponentLoader/ComponentLoader';
import { FlexContainer, Button, Icon } from '../../../styledElements';

import { updateGameStatus } from '../../../redux';

const QuarterContainer = styled.div`
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  padding: 10px;
`;

export default function QuarterControl({ league }) {
  const dispatch = useDispatch();

  const [isSetStatus, setIsSetStatus] = useState(false);
  const [qNumber, setQNumber] = useState(null);
  const { id: activeGameId, status, statusPending } = useSelector(
    (state) => state.game
  );

  const getLeagueSegmentsLimit = () => (league.isHalves ? 2 : 4);
  const getLeagueSegment = () => (league.isHalves ? 'H' : 'Q');

  const saveGameStatus = useCallback(
    (status) => dispatch(updateGameStatus({ gameId: activeGameId, status })),
    [dispatch, activeGameId]
  );

  const openSetStatus = () => {
    setQNumber(parseInt(status[1]));
    setIsSetStatus(true);
  };
  const closeSetStatus = () => setIsSetStatus(false);

  const nextQ = () =>
    setQNumber(qNumber < getLeagueSegmentsLimit() ? qNumber + 1 : qNumber);
  const previousQ = () => setQNumber(qNumber > 1 ? qNumber - 1 : qNumber);

  const setStatus = () => {
    saveGameStatus(`${getLeagueSegment()}${qNumber}`);
    closeSetStatus();
  };

  return (
    status && (
      <FlexContainer column justify="flex-start" align="center">
        {!isSetStatus ? (
          <Button color="menu" onClick={openSetStatus}>
            Set Status
          </Button>
        ) : (
          <FlexContainer>
            <Button color="error" onClick={previousQ} disabled={qNumber === 1}>
              {getLeagueSegment()}
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faMinus} size="sm" />
              </Icon>
            </Button>
            <Button
              color="secondary"
              onClick={nextQ}
              disabled={qNumber === getLeagueSegmentsLimit()}
            >
              {getLeagueSegment()}
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </Icon>
            </Button>
          </FlexContainer>
        )}
        <ComponentLoader
          loading={statusPending}
          size={60}
          padding="15"
          clearHeight
        >
          <QuarterContainer>
            {isSetStatus ? `${getLeagueSegment()}${qNumber}` : status}
          </QuarterContainer>
        </ComponentLoader>
        {isSetStatus && (
          <FlexContainer>
            <Button color="error" onClick={closeSetStatus}>
              Cancel
            </Button>
            <Button color="success" onClick={setStatus}>
              Set
            </Button>
          </FlexContainer>
        )}
      </FlexContainer>
    )
  );
}
