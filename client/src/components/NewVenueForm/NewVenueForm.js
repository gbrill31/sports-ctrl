import React, { useState, Fragment } from 'react';
import { ControlsContainer } from '../../styledComponents';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
  margin-right: 20px;
`;

export default function NewVenueForm() {
  const [venueName, setVenueName] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [venueSeats, setVenueSeats] = useState(0);

  const [isNewVenue, setIsNewVenue] = useState(false);


  const setNewVenue = () => setIsNewVenue(true);
  const cancelNewVenue = () => {
    setIsNewVenue(false);
    setVenueName('');
    setVenueCity('');
    setVenueSeats(0);
  }

  const saveNewVenue = () => {
    const venue = {
      name: venueName,
      city: venueCity,
      seats: Number(venueSeats)
    };
    console.log(venue);
  }
  const onVenueNameChange = (e) => setVenueName(e.target.value);
  const onVenueCityChange = (e) => setVenueCity(e.target.value);
  const onVenueSeatsChange = (e) => setVenueSeats(e.target.value);


  return (
    <ControlsContainer flexColumn>
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
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Venue Name"
                  value={venueName}
                  onChange={onVenueNameChange}
                />
                <StyledTextField
                  margin="dense"
                  id="city"
                  label="City"
                  type="text"
                  placeholder="Venue City"
                  value={venueCity}
                  onChange={onVenueCityChange}
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
              <ControlsContainer>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={saveNewVenue}
                >
                  Save
              </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={cancelNewVenue}
                >
                  Cancel
              </Button>
              </ControlsContainer>

            </Fragment>
          )
      }

    </ControlsContainer>
  )
}
