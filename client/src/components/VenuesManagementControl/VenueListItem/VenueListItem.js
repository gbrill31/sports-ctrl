import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import useFormInput from '../../../hooks/useFormInput';
import useSaveVenue from '../../../hooks/reactQuery/useSaveVenue';
import { faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexContainer, Button, Icon, Input } from '../../../styledElements';
import ItemActionsMenu from '../../ItemActionsMenu/ItemActionsMenu';
import { isFullControl } from '../../../services/userPermissions';

const ItemContainer = styled.div`
  width: 25%;
  min-width: 350px;
  min-height: 120px;
  background-color: #fff;
  border-radius: 0 15px 15px 0;
  color: #333;
  text-transform: capitalize;
  padding: 15px;
  margin: 0 0 15px 15px;
  transition: box-shadow 0.1s ease;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: ${(props) =>
      !props.selected
        ? `0 2px 5px 1px ${props.theme.primary.hover} inset`
        : ''};
  }

  ${(props) =>
    props.selected &&
    css`
      box-shadow: 0 5px 8px 0px ${(props) => props.theme.secondary.color} inset;
    `}

  h2 {
    font-size: 3rem;
    font-weight: bold;
    margin: 0;
  }
  h3 {
    margin: 0;
    color: #777;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 300;
  }
  h4 {
    margin: 8px 0 8px 10px;
    color: #999;
    font-weight: 300;
  }
`;

const VenueInfoSection = styled.div`
  position: absolute;
  bottom: ${(props) => (props.selected ? '3px' : '-50px')};
  left: 7px;
  transition: bottom 0.2s ease-in-out;
`;

function VenueListItem({
  venue,
  deleteVenuePrompt,
  selectedVenue,
  setSelectedVenue,
  user,
}) {
  const [isEditVenue, setIsEditVenue] = useState(false);

  const venueName = useFormInput(venue.name);
  const venueCountry = useFormInput(venue.country);
  const venueCity = useFormInput(venue.city);
  const [venueSeats, setVenueSeats] = useState(venue.seats);

  const selectVenue = () => {
    setSelectedVenue(venue);
  };

  const isVenueSelected = () => selectedVenue?.id === venue.id;

  const editVenue = () => {
    setIsEditVenue(true);
  };

  const deleteVenue = () => {
    deleteVenuePrompt();
  };

  const cancelEditVenue = () => {
    setIsEditVenue(false);
  };

  const saveVenue = useSaveVenue(cancelEditVenue);

  const updateVenue = () => {
    saveVenue({
      id: venue.id,
      name: venueName.value,
      country: venueCountry.value,
      city: venueCity.value,
      seats: venueSeats,
    });
  };

  const onVenueSeatsChange = (e) => setVenueSeats(e.target.value);

  return (
    <ItemContainer onClick={selectVenue} selected={isVenueSelected()}>
      <ItemActionsMenu
        editItem={editVenue}
        deleteItem={deleteVenue}
        isShow={isFullControl(user) && isVenueSelected() && !isEditVenue}
      />
      {isEditVenue ? (
        <>
          <FlexContainer fullWidth padding="0">
            <FlexContainer fullWidth justify="space-around" align="center">
              <label style={{ width: '10px' }}>Name:</label>
              <Input
                autoFocus
                required
                ref={venueName.ref}
                id="name"
                label="Name"
                type="text"
                placeholder="Venue Name"
                value={venueName.value}
                onChange={venueName.onChange}
              />
            </FlexContainer>
            <FlexContainer fullWidth justify="space-around" align="center">
              <label style={{ width: '10px' }}>City:</label>
              <Input
                required
                ref={venueCity.ref}
                id="city"
                label="City"
                type="text"
                placeholder="Venue City"
                value={venueCity.value}
                onChange={venueCity.onChange}
              />
            </FlexContainer>
            <FlexContainer fullWidth justify="space-around" align="center">
              <label style={{ width: '10px' }}>Country:</label>
              <Input
                required
                ref={venueCountry.ref}
                id="country"
                label="Country"
                type="text"
                placeholder="Venue Country"
                value={venueCountry.value}
                onChange={venueCountry.onChange}
              />
            </FlexContainer>
            <FlexContainer fullWidth justify="space-around" align="center">
              <label style={{ width: '10px' }}>Seats:</label>
              <Input
                id="seats"
                label="Seats"
                type="number"
                min="0"
                placeholder="Venue Seats"
                value={venueSeats}
                onChange={onVenueSeatsChange}
              />
            </FlexContainer>
          </FlexContainer>
        </>
      ) : (
        <>
          <h2>{venue.name}</h2>
          <FlexContainer align="baseline" padding="0">
            <h3>{venue.city}</h3>
            <h4>{venue.country}</h4>
          </FlexContainer>
          <VenueInfoSection selected={isVenueSelected()}>
            <FlexContainer align="center" justify="center" padding="0">
              <h4>{` host up to ${venue.seats} fans`}</h4>
            </FlexContainer>
          </VenueInfoSection>
        </>
      )}

      {isEditVenue && (
        <FlexContainer justify={isEditVenue ? 'flex-end' : false}>
          <Button
            aria-label="cancel update venue"
            color="error"
            onClick={cancelEditVenue}
          >
            Cancel
            <Icon spaceLeft>
              <FontAwesomeIcon icon={faTimesCircle} size="sm" />
            </Icon>
          </Button>
          <Button
            aria-label="update venue"
            color="success"
            onClick={updateVenue}
          >
            Save
            <Icon spaceLeft>
              <FontAwesomeIcon icon={faSave} size="sm" />
            </Icon>
          </Button>
        </FlexContainer>
      )}
    </ItemContainer>
  );
}

VenueListItem.propTypes = {
  venue: PropTypes.object.isRequired,
  deleteVenuePrompt: PropTypes.func,
  selectedVenue: PropTypes.object,
  setSelectedVenue: PropTypes.func,
};

export default React.memo(VenueListItem);
