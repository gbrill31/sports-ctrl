import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer, SpaceSides } from '../../styledElements';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import useFormInput from '../../hooks/useFormInput';

import {
  saveNewVenue,
} from '../../actions';

const SpacedTextField = SpaceSides(TextField);
const SpacedButton = SpaceSides(Button);

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
    setIsNewVenue(false);
  }

  const cancelNewVenue = () => {
    setIsNewVenue(false);
    resetForm();
  }

  const createVenue = (venue) => dispatch(saveNewVenue(venue));

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

  const createNewVenue = () => {
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
    <FlexContainer>
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
            <FlexContainer center>
              <div>
                <SpacedTextField
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
                  placeholder="Enter Venue Name"
                  value={venueName.value}
                  onChange={venueName.onChange}
                />
                <SpacedTextField
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
                  placeholder="Enter Venue Country"
                  value={venueCountry.value}
                  onChange={venueCountry.onChange}
                />
                <SpacedTextField
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
                  placeholder="Enter Venue City"
                  value={venueCity.value}
                  onChange={venueCity.onChange}
                />
                <SpacedTextField
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
              <FlexContainer center>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={isSaving}
                  onClick={createNewVenue}
                >
                  Save
                  {isSaving && <CircularProgress size={24} />}
                </Button>
                <SpacedButton
                  color="secondary"
                  variant="contained"
                  onClick={cancelNewVenue}
                >
                  Cancel
              </SpacedButton>
              </FlexContainer>

            </FlexContainer>
          )
      }

    </FlexContainer>
  )
}
