import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faBasketballBall } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AutoCompleteInput from '../../AutoCompleteInput/AutoCompleteInput';
import { FlexContainer, MainTitle, Button, ButtonIcon } from '../../../styledElements';

import {
  createNewGame,
  getAllTeams,
  getAllVenues,
  stopLoading
} from '../../../actions';


export default function CreateGameForm() {
  const dispatch = useDispatch();

  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [venue, setVenue] = useState(null);

  const isDBConnected = useSelector(state => state.db.isConnected);
  const isGameLoading = useSelector(state => state.games.activeGamePending);
  const venues = useSelector(state => state.venues.items);
  const isVenuesLoading = useSelector(state => state.venues.getVenuesPending);
  const teams = useSelector(state => state.teams.items);
  const isTeamsLoading = useSelector(state => state.teams.getTeamsPending);

  const getVenues = useCallback(() => dispatch(getAllVenues()), [dispatch]);
  const getTeams = useCallback(() => dispatch(getAllTeams()), [dispatch]);

  const stopCurrentGameLoading = useCallback(() => dispatch(stopLoading()), [dispatch]);
  const createGame = useCallback((game) => dispatch(createNewGame(game)), [dispatch]);

  useEffect(() => {
    if (isDBConnected && !isGameLoading) {
      getVenues();
      getTeams();
      stopCurrentGameLoading();
    }
  }, [getVenues, getTeams, isGameLoading, stopCurrentGameLoading, isDBConnected]);

  const selectVanue = (venueId) => {
    setVenue(venues.find(v => v.id === venueId));
  }

  const selecteHomeTeam = (teamId) => {
    setHomeTeam(teams.find(t => t.getId() === teamId));
  }
  const selecteAwayTeam = (teamId) => {
    setAwayTeam(teams.find(t => t.getId() === teamId));
  }

  const startNewGame = () => {
    const game = {
      home: homeTeam.getName(),
      homeId: homeTeam.getId(),
      away: awayTeam.getName(),
      awayId: awayTeam.getId(),
      venue: venue.name,
      active: true
    };
    createGame(game);
  }

  return (
    <>
      <MainTitle>Select Teams and Venue</MainTitle>
      <FlexContainer align="baseline" justify="center">
        <AutoCompleteInput
          id="home"
          color="#fff"
          spaceLeft
          selectedValue={homeTeam ? homeTeam.getName() : ''}
          options={teams}
          getOptionLabel={option => option.name}
          placeholder="Select Home Team"
          onSelection={selecteHomeTeam}
          loading={isTeamsLoading}
        />
        <MainTitle>VS</MainTitle>
        <AutoCompleteInput
          id="away"
          color="#fff"
          spaceLeft
          selectedValue={awayTeam ? awayTeam.getName() : ''}
          options={teams}
          getOptionLabel={option => option.name}
          placeholder="Select Away Team"
          onSelection={selecteAwayTeam}
          loading={isTeamsLoading}
        />
        <MainTitle>AT</MainTitle>
        <AutoCompleteInput
          id="vanues"
          color="#fff"
          spaceLeft
          selectedValue={venue ? venue.name : ''}
          options={venues}
          getOptionLabel={option => option.name}
          placeholder="Select Vanue"
          onSelection={selectVanue}
          loading={isVenuesLoading}
        />
        <Button
          color="success"
          onClick={startNewGame}
          saving={isGameLoading}
        >
          {isGameLoading ? 'Starting...' : 'Start Game'}
          <ButtonIcon spaceLeft>
            <FontAwesomeIcon icon={faBasketballBall} size="sm" />
          </ButtonIcon>
        </Button>
      </FlexContainer>
    </>
  )
}
