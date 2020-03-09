import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../../styledComponents';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import useFormInput from '../../hooks/useFormInput';
import styled from 'styled-components';

import {
  createNewVenue,
} from '../../actions';

const StyledTextField = styled(TextField)`
  margin-right: 20px;
`;

export default function NewVenueForm() {
  const dispatch = useDispatch();

  const venueName = useFormInput('');
  const venueCountry = useFormInput('');
  const venueCity = useFormInput('');
  const [venueSeats, setVenueSeats] = useState(0);

  const isSaving = useSelector(state => state.venues.venueSavePending);

  const [isNewVenue, setIsNewVenue] = useState(false);


  const setNewVenue = () => setIsNewVenue(true);

  const resetForm = () => {
    venueName.setValue('');
    venueCountry.setValue('');
    venueCity.setValue('');
    venueName.resetIsValid();
    venueCountry.resetIsValid();
    venueCity.resetIsValid();
    setVenueSeats(0);
  }

  const cancelNewVenue = () => {
    setIsNewVenue(false);
    resetForm();
  }

  const createVenue = (venue) => dispatch(createNewVenue(venue));

  const validateAllInputs = () => {
    venueName.validateInput();
    venueCountry.validateInput();
    venueCity.validateInput();

  }

  const isSaveValid = () => {
    return venueName.ref.current.checkValidity()
      && venueCountry.ref.current.checkValidity()
      && venueCity.ref.current.checkValidity();
  }

  const saveNewVenue = () => {
    validateAllInputs();
    if (isSaveValid()) {
      createVenue({
        name: venueName.value,
        country: venueCountry.value,
        city: venueCity.value,
        seats: Number(venueSeats)
      });
      resetForm();
    }
  };

  const onVenueSeatsChange = (e) => setVenueSeats(e.target.value);




  return (
    <FlexContainer column>
      {
        !isNewVenue ? (
          <Button
            color="primary"
            variant="contained"
            onClick={setNewVenue}
          >
            New Venue
            </Button>
        ) : (
            <Fragment>
              <div>
                <StyledTextField
                  autoFocus
                  required
                  inputProps={{
                    ref: venueName.ref
                  }}
                  error={!venueName.isValid}
                  helperText={venueName.errorMessage}
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Venue Name"
                  value={venueName.value}
                  onChange={venueName.onChange}
                />
                <StyledTextField
                  margin="dense"
                  required
                  inputProps={{
                    ref: venueCountry.ref
                  }}
                  error={!venueCountry.isValid}
                  helperText={venueCountry.errorMessage}
                  id="country"
                  label="Country"
                  type="text"
                  placeholder="Venue Country"
                  value={venueCountry.value}
                  onChange={venueCountry.onChange}
                />
                <StyledTextField
                  margin="dense"
                  required
                  inputProps={{
                    ref: venueCity.ref
                  }}
                  error={!venueCity.isValid}
                  helperText={venueCity.errorMessage}
                  id="city"
                  label="City"
                  type="text"
                  placeholder="Venue City"
                  value={venueCity.value}
                  onChange={venueCity.onChange}
                />
                <StyledTextField
                  margin="dense"
                  id="seats"
                  label="Seats"
                  type="number"
                  inputProps={{
                    min: 0
                  }}
                  placeholder="Venue Seats"
                  value={venueSeats}
                  onChange={onVenueSeatsChange}
                />
              </div>
              <FlexContainer>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={isSaving}
                  onClick={saveNewVenue}
                >
                  Save
                  {isSaving && <CircularProgress size={24} />}
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={cancelNewVenue}
                >
                  Cancel
              </Button>
              </FlexContainer>

            </Fragment>
          )
      }

    </FlexContainer>
  )
}
