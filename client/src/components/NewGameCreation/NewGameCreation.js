import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoCompleteInput from '../AutoCompleteInput/AutoCompleteInput';

import { FlexContainer, MainTitle } from '../../styledElements';

import {
  createNewGame,
  getAllVenues,
  getAllTeams
} from '../../actions';



function NewGameCreation() {
  const dispatch = useDispatch();
  // const game = useSelector(state => state.games.game);
  // const isSaving = useSelector(state => state.games.gameCreatePending);
  // const error = useSelector(state => state.games.gameError);

  const [homeName, setHomeName] = useState('');
  const [awayName, setAwayName] = useState('');
  const [venueName, setVenueName] = useState('');

  const venues = useSelector(state => state.venues.items);
  const teams = useSelector(state => state.teams.items);
  // const createGame = useCallback((teams) => dispatch(createNewGame(teams)), [dispatch]);
  const getVenues = useCallback(() => dispatch(getAllVenues()), [dispatch]);
  const getTeams = useCallback(() => dispatch(getAllTeams()), [dispatch]);


  useEffect(() => {
    getVenues();
    getTeams();
  }, [getVenues, getTeams]);

  return (
    <>
      <MainTitle>Select Teams and Venue</MainTitle>
      <FlexContainer>
        <AutoCompleteInput
          id="home"
          color="#fff"
          spaceLeft
          selectedValue={homeName}
          options={teams}
          getOptionLabel={option => option.name}
          placeholder="Select Home Team"
          onSelection={setHomeName}
        />
        <MainTitle>VS</MainTitle>
        <AutoCompleteInput
          id="away"
          color="#fff"
          spaceLeft
          selectedValue={awayName}
          options={teams}
          getOptionLabel={option => option.name}
          placeholder="Select Away Team"
          onSelection={setAwayName}
        />
        <MainTitle>AT</MainTitle>
        <AutoCompleteInput
          id="vanues"
          color="#fff"
          spaceLeft
          selectedValue={venueName}
          options={venues}
          getOptionLabel={option => option.name}
          placeholder="Select Vanue"
          onSelection={setVenueName}
        />
      </FlexContainer>
    </>
  );
};

export default NewGameCreation;