import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlexContainer } from '../../../styledElements';
import {
  DialogActions, DialogTitle, DialogContent, Dialog,
  CircularProgress
} from '@material-ui/core';
import { Button, Input } from '../../../styledElements';
import useFormInput from '../../../hooks/useFormInput';

import {
  saveNewVenue,
} from '../../../actions';


export default function NewVenueFormDialog({ isNewVenue, setIsNewVenue }) {
  const dispatch = useDispatch();

  const venueName = useFormInput('');
  const venueCountry = useFormInput('');
  const venueCity = useFormInput('');
  const venueSeats = useFormInput(0);

  const isSaving = useSelector(state => state.venues.venueSavePending);


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
    <Fragment>

      {
        isNewVenue && (
          <Dialog
            open={isNewVenue}
            aria-labelledby="new venue"
            onEscapeKeyDown={cancelNewVenue}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Create a New Venue</DialogTitle>
            <DialogContent>
              <FlexContainer column justify="center" alig="center">
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>Name</label>
                  <Input
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
                </FlexContainer>
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>Country</label>
                  <Input
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
                </FlexContainer>
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>City</label>
                  <Input
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
                </FlexContainer>
                <FlexContainer fullWidth justify="space-evenly" align="center">
                  <label style={{ width: '10px' }}>Seats</label>
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
                </FlexContainer>
              </FlexContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelNewVenue} color="error">
                Cancel
      </Button>
              <Button onClick={createNewVenue} color="success">
                Create
              </Button>
              {isSaving && <CircularProgress size={24} />}
            </DialogActions>
          </Dialog>
        )
      }
    </Fragment>
  )
}
