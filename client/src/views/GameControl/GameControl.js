import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faBasketballBall } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import AutoCompleteInput from '../../components/AutoCompleteInput/AutoCompleteInput';
import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';

import { FlexContainer, MainTitle, Button, ButtonIcon } from '../../styledElements';

import {
  createNewGame,
  getAllVenues,
  getAllTeams,
  getActiveGame,
  stopLoading
} from '../../actions';



export default function GameControl() {
  const dispatch = useDispatch();

  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [venue, setVenue] = useState(null);

  const isDBConnected = useSelector(state => state.db.isConnected);
  const game = useSelector(state => state.games.game);
  const isGameLoading = useSelector(state => state.games.gamePending);
  const gameLoadError = useSelector(state => state.games.gameError);

  const venues = useSelector(state => state.venues.items);
  const isVenuesLoading = useSelector(state => state.venues.getVenuesPending);
  const teams = useSelector(state => state.teams.items);
  const isTeamsLoading = useSelector(state => state.teams.getTeamsPending);



  const getVenues = useCallback(() => dispatch(getAllVenues()), [dispatch]);
  const getTeams = useCallback(() => dispatch(getAllTeams()), [dispatch]);
  const getCurrentGame = useCallback(() => dispatch(getActiveGame()), [dispatch]);
  const stopCurrentGameLoading = useCallback(() => dispatch(stopLoading()), [dispatch]);

  const createGame = useCallback((game) => dispatch(createNewGame(game)), [dispatch]);

  const selectVanue = (venueId) => {
    setVenue(venues.find(v => v.id === venueId));
  }

  const selecteHomeTeam = (teamId) => {
    setHomeTeam(teams.find(t => t.getId() === teamId));
  }
  const selecteAwayTeam = (teamId) => {
    setAwayTeam(teams.find(t => t.getId() === teamId));
  }

  useEffect(() => {
    if (isDBConnected && !game) {
      getCurrentGame();
    }
  }, [getCurrentGame, game, isDBConnected]);

  useEffect(() => {
    if (isDBConnected && !game && !isGameLoading) {
      getVenues();
      getTeams();
      stopCurrentGameLoading();
    }
  }, [getVenues, getTeams, game, isGameLoading, stopCurrentGameLoading, isDBConnected]);

  useEffect(() => {
    if (gameLoadError) {
      toast.error(gameLoadError.message);
    }
  }, [gameLoadError]);

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
      <ComponentLoader loading={isGameLoading}>
        {
          !game ? (
            <>
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
          ) : (
              <MainTitle>{JSON.stringify(game)}</MainTitle>
            )

        }
      </ComponentLoader >
    </>
  );
};
