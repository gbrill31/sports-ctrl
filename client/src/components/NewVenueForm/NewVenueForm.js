import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer, SpaceSides } from '../../styledElements';
import {
  TextField, DialogActions, DialogContentText, DialogTitle, DialogContent, Dialog,
  CircularProgress
} from '@material-ui/core';
import { Button, Input } from '../../styledElements';
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
  const venueSeats = useFormInput(0);

  const isSaving = useSelector(state => state.venues.venueSavePending);

  const [isNewVenue, setIsNewVenue] = useState(false);


  const setNewVenue = () => setIsNewVenue(true);

  const resetForm = () => {
    venueName.setValue('');
    venueCountry.setValue('');
    venueCity.setValue('');
    venueSeats.setValue(0);
    venueName.resetIsValid();
    venueCountry.resetIsValid();
    venueCity.resetIsValid();
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
        seats: Number(venueSeats.value)
      });
      resetForm();
    }
  };



  return (
    <FlexContainer>
      {
        !isNewVenue ? (
          <Button
            color="generic"
            onClick={setNewVenue}
          >
            New Venue
          </Button>
        ) : (
            <Fragment>
              <h4>New Venue</h4>
              <FlexContainer center>
                <div>
                  <Input
                    spaceRight
                    required
                    autoFocus
                    onBlur={venueName.onChange}
                    error={!venueName.isValid}
                    ref={venueName.ref}
                    id="name"
                    type="text"
                    placeholder={`Enter Venue Name${!venueName.isValid ? ' *' : ''}`}
                    value={venueName.value}
                    onChange={venueName.onChange}
                  />
                  <Input
                    spaceRight
                    required
                    onBlur={venueCountry.onChange}
                    error={!venueCountry.isValid}
                    ref={venueCountry.ref}
                    id="country"
                    type="text"
                    placeholder={`Enter Venue Country${!venueCountry.isValid ? ' *' : ''}`}
                    value={venueCountry.value}
                    onChange={venueCountry.onChange}
                  />
                  <Input
                    spaceRight
                    required
                    onBlur={venueCity.onChange}
                    error={!venueCity.isValid}
                    ref={venueCity.ref}
                    id="city"
                    type="text"
                    placeholder={`Enter Venue City${!venueCity.isValid ? ' *' : ''}`}
                    value={venueCity.value}
                    onChange={venueCity.onChange}
                  />
                  <label htmlFor="seats" style={{ color: 'white' }}>Venue Seats</label>
                  <Input
                    id="seats"
                    type="number"
                    min="0"
                    ref={venueSeats.ref}
                    placeholder="Venue Seats"
                    value={venueSeats.value}
                    onChange={venueSeats.onChange}
                    onFocus={venueSeats.select}
                  />
                </div>
                <FlexContainer center>
                  <Button
                    color="success"
                    disabled={isSaving}
                    onClick={createNewVenue}
                  >
                    Save
                  {isSaving && <CircularProgress size={24} />}
                  </Button>
                  <SpacedButton
                    color="error"
                    onClick={cancelNewVenue}
                  >
                    Cancel
              </SpacedButton>
                </FlexContainer>

              </FlexContainer>
            </Fragment>
          )
      }

    </FlexContainer>
  )
}
