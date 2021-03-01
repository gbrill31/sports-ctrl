import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FlexContainer } from '../../../styledElements';
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
  padding: 0 15px;
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
  bottom: ${(props) => (props.selected ? '0px' : '-50px')};
  left: 7px;
  transition: bottom 0.2s ease-in-out;
`;

function VenueListItem({
  venue,
  deleteVenuePrompt,
  selectedVenue,
  setSelectedVenue,
  openNewVenueDialog,
  user,
}) {
  const [isItemHover, setIsItemHover] = useState(false);

  const setItemMouseEnter = () => setIsItemHover(true);
  const setItemMouseLeave = () => setIsItemHover(false);

  const selectVenue = () => {
    setSelectedVenue(venue);
  };

  const isVenueSelected = () => selectedVenue?.id === venue.id;

  const editVenue = () => {
    selectVenue();
    openNewVenueDialog();
  };

  const deleteVenue = () => {
    deleteVenuePrompt();
  };

  return (
    <ItemContainer
      onClick={selectVenue}
      selected={isVenueSelected()}
      onMouseEnter={setItemMouseEnter}
      onMouseLeave={setItemMouseLeave}
    >
      <ItemActionsMenu
        editItem={editVenue}
        deleteItem={deleteVenue}
        isShow={isFullControl(user) && isVenueSelected()}
      />
      <h2>{venue.name}</h2>
      <FlexContainer align="baseline" padding="0">
        <h3>{venue.city}</h3>
        <h4>{venue.country}</h4>
      </FlexContainer>
      <VenueInfoSection selected={isItemHover || isVenueSelected()}>
        <FlexContainer align="center" justify="center" padding="0">
          <h4>{` host up to ${venue.seats} fans`}</h4>
        </FlexContainer>
      </VenueInfoSection>
    </ItemContainer>
  );
}

VenueListItem.propTypes = {
  venue: PropTypes.object.isRequired,
  deleteVenuePrompt: PropTypes.func,
  selectedVenue: PropTypes.object,
  setSelectedVenue: PropTypes.func,
  openNewVenueDialog: PropTypes.func,
};

export default React.memo(VenueListItem);
