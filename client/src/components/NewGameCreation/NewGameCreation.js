import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import styled from 'styled-components';
import {
  TextField
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'

import { FlexContainer, MainTitle, SpaceSides } from '../../styledElements';

import {
  createNewGame,
  getAllVenues
} from '../../actions';

const StyledTextField = SpaceSides(TextField);


function NewGameCreation() {
  const dispatch = useDispatch();
  // const game = useSelector(state => state.games.game);
  // const isSaving = useSelector(state => state.games.gameCreatePending);
  // const error = useSelector(state => state.games.gameError);
  const venues = useSelector(state => state.venues.items);

  const [homeName, setHomeName] = useState('');
  const [awayName, setAwayName] = useState('');

  const createGame = useCallback((teams) => dispatch(createNewGame(teams)), [dispatch]);
  const getVenues = useCallback(() => dispatch(getAllVenues()), [dispatch]);

  const onHomeInputChange = (e) => setHomeName(e.target.value);
  const onAwayInputChange = (e) => setAwayName(e.target.value);


  useEffect(() => {
    getVenues();
  }, [getVenues]);

  return (
    <div>
      <MainTitle>Select Teams</MainTitle>
      <FlexContainer>
        <StyledTextField
          autoFocus
          margin="dense"
          id="home"
          label="Home Team"
          type="text"
          placeholder="Home team"
          value={homeName}
          onChange={onHomeInputChange}
        />
        <StyledTextField
          margin="dense"
          id="away"
          label="Away Team"
          type="text"
          placeholder="Away team"
          value={awayName}
          onChange={onAwayInputChange}
        />
        <Autocomplete
          id="venues"
          options={venues}
          getOptionLabel={option => option.name}
          renderInput={params => <StyledTextField {...params} label="Venue" variant="outlined" />}
        />
      </FlexContainer>
    </div>
  );
};

export default NewGameCreation;