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
import useLeagues from '../../hooks/reactQuery/useLeagues';

export default function CreateGameForm({ cancelNewGame }) {
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [venue, setVenue] = useState(null);
  const [league, setLeague] = useState(null);

  const queryClient = useQueryClient();

  const {
    isLoading: isActiveGameLoading,
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
    isLoading: isLeaguesLoading,
    data: leagues,
    isFetching: isLeaguesFetching,
  } = useLeagues(queryClient.getQueryData('dbConnection') !== undefined);

  const leaguesLoading = () => isLeaguesLoading || isLeaguesFetching;

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
  const selectLeague = (leagueId) => {
    setLeague(leagues.find((v) => v.id === leagueId));
  };

  const selectHomeTeam = (teamId) => {
    setHomeTeam(teams.find((t) => t.id === teamId));
  };
  const selectAwayTeam = (teamId) => {
    setAwayTeam(teams.find((t) => t.id === teamId));
  };

  const startNewGame = () => {
    const game = {
      home: homeTeam.name,
      homeId: homeTeam.id,
      away: awayTeam.name,
      awayId: awayTeam.id,
      venue: venue.name,
      leagueId: league.id,
      active: true,
    };
    createGame(game);
  };

  const getTeamsSelectionList = (team) => {
    return team ? teams.filter((t) => t.id !== team.id) : teams;
  };

  const isCreateGame = () => homeTeam && awayTeam && venue && league;

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
                  selectedValue={homeTeam ? homeTeam.name : ''}
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
                  selectedValue={awayTeam ? awayTeam.name : ''}
                  options={getTeamsSelectionList(homeTeam)}
                  getOptionLabel={(option) => option.name}
                  placeholder="Select Away Team"
                  onSelection={selectAwayTeam}
                  loading={teamsLoading()}
                />
              </FlexContainer>
            </FlexContainer>
            <FlexContainer align="center" justify="center" noWrap padding="0">
              <FlexContainer column padding="0" align="center" justify="center">
                <SubTitle align="center" size="1.2rem">
                  Select League
                </SubTitle>
                <FlexContainer
                  align="center"
                  justify="center"
                  noWrap
                  padding="0"
                >
                  <AutoCompleteInput
                    id="leagues"
                    color="#fff"
                    selectedValue={league ? league.name : ''}
                    options={leagues}
                    getOptionLabel={(option) => option.name}
                    placeholder="Select League"
                    onSelection={selectLeague}
                    loading={leaguesLoading()}
                  />
                </FlexContainer>
              </FlexContainer>
              <FlexContainer column padding="0" align="center" justify="center">
                <SubTitle align="center" size="1.2rem">
                  Select Venue
                </SubTitle>
                <FlexContainer
                  align="center"
                  justify="center"
                  noWrap
                  padding="0"
                >
                  <AutoCompleteInput
                    id="venues"
                    color="#fff"
                    selectedValue={venue ? venue.name : ''}
                    options={venues}
                    getOptionLabel={(option) => option.name}
                    placeholder="Select Venue"
                    onSelection={selectVenue}
                    loading={venuesLoading()}
                  />
                </FlexContainer>
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
              disabled={!isCreateGame()}
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
