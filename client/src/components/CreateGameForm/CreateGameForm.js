import React, { useState } from 'react';
import { faBasketballBall, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';
import {
  FlexContainer,
  Button,
  Icon,
  SubTitle,
  GridContainer,
} from '../../styledElements';
import useVenues from '../../hooks/reactQuery/useVenues';
import useTeams from '../../hooks/reactQuery/useTeams';
import useActiveGame from '../../hooks/reactQuery/useActiveGame';
import useCreateGame from '../../hooks/reactQuery/useCreateGame';
import { useQueryClient } from 'react-query';

export default function CreateGameForm({ cancelNewGame }) {
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [venue, setVenue] = useState(null);

  const queryClient = useQueryClient();

  const {
    isLoading: isActiveGameLoading,
    // data: activeGame,
    isFetching: isActiveGameFetching,
  } = useActiveGame(queryClient.getQueryData('dbConnection') !== undefined);

  const isGameLoading = () => isActiveGameLoading || isActiveGameFetching;

  const {
    isLoading: isVenuesLoading,
    data: venues,
    isFetching: isVenuesFetching,
  } = useVenues(queryClient.getQueryData('dbConnection') !== undefined);

  const venuesLoading = () => isVenuesLoading || isVenuesFetching;

  const {
    isLoading: isTeamsLoading,
    data: teams,
    isFetching: isTeamsFetching,
  } = useTeams(queryClient.getQueryData('dbConnection') !== undefined);

  const teamsLoading = () => isTeamsLoading || isTeamsFetching;

  const createGame = useCreateGame();

  const selectVenue = (venueId) => {
    setVenue(venues.find((v) => v.id === venueId));
  };

  const selectHomeTeam = (teamId) => {
    setHomeTeam(teams.find((t) => t.getId() === teamId));
  };
  const selectAwayTeam = (teamId) => {
    setAwayTeam(teams.find((t) => t.getId() === teamId));
  };

  const startNewGame = () => {
    const game = {
      home: homeTeam.getName(),
      homeId: homeTeam.getId(),
      away: awayTeam.getName(),
      awayId: awayTeam.getId(),
      venue: venue.name,
      active: true,
    };
    createGame(game);
  };

  const getTeamsSelectionList = (team) => {
    return team ? teams.filter((t) => t.getId() !== team.getId()) : teams;
  };

  return (
    <>
      <FlexContainer
        fullWidth
        fullHeight
        column
        align="center"
        justify="center"
      >
        <GridContainer columnsSpread="50% 50%" width="100%" noPadding>
          <div style={{ gridRow: 1, padding: '10px' }}>
            <Button color="error" onClick={cancelNewGame}>
              Close
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faTimes} size="sm" />
              </Icon>
            </Button>
          </div>
          <FlexContainer
            fullWidth
            column
            padding="0"
            align="center"
            justify="center"
            style={{ gridRow: 2, gridColumn: '1 / 3' }}
          >
            <FlexContainer column padding="0" align="center" justify="center">
              <SubTitle align="center" size="1.2rem">
                Select Teams
              </SubTitle>
              <FlexContainer align="center" justify="center" noWrap padding="0">
                <AutoCompleteInput
                  id="home"
                  color="#fff"
                  selectedValue={homeTeam ? homeTeam.getName() : ''}
                  options={getTeamsSelectionList(awayTeam)}
                  getOptionLabel={(option) => option.name}
                  placeholder="Select Home Team"
                  onSelection={selectHomeTeam}
                  loading={teamsLoading()}
                />
                <SubTitle align="center" size="1.2rem">
                  VS
                </SubTitle>
                <AutoCompleteInput
                  id="away"
                  color="#fff"
                  selectedValue={awayTeam ? awayTeam.getName() : ''}
                  options={getTeamsSelectionList(homeTeam)}
                  getOptionLabel={(option) => option.name}
                  placeholder="Select Away Team"
                  onSelection={selectAwayTeam}
                  loading={teamsLoading()}
                />
              </FlexContainer>
            </FlexContainer>
            <FlexContainer column padding="0" align="center" justify="center">
              <SubTitle align="center" size="1.2rem">
                Select Venue
              </SubTitle>
              <FlexContainer align="center" justify="center" noWrap padding="0">
                <AutoCompleteInput
                  id="vanues"
                  color="#fff"
                  selectedValue={venue ? venue.name : ''}
                  options={venues}
                  getOptionLabel={(option) => option.name}
                  placeholder="Select Vanue"
                  onSelection={selectVenue}
                  loading={venuesLoading()}
                />
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 3,
            }}
            align="center"
            justify="center"
            noWrap
            fullWidth
          >
            <Button
              color="success"
              onClick={startNewGame}
              saving={isGameLoading()}
              width="200px"
              height="60px"
              disabled={!homeTeam || !awayTeam || !venue}
            >
              {isGameLoading() ? 'Starting...' : 'Start Game'}
              <Icon spaceLeft>
                <FontAwesomeIcon icon={faBasketballBall} size="sm" />
              </Icon>
            </Button>
          </FlexContainer>
        </GridContainer>
      </FlexContainer>
    </>
  );
}
