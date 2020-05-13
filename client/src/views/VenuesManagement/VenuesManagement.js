import React, { useState } from 'react';
import { MainTitle, FlexContainer, Button, ButtonIcon, ScrollableContainer } from '../../styledElements';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewVenueFormDialog from '../../components/VenuesManagementControl/NewVenueFormDIalog/NewVenueFormDialog';
import VenuesList from '../../components/VenuesManagementControl/VenuesList/VenuesList';


export default function VenuesManagement() {
  const [isNewVenue, setIsNewVenue] = useState(false);

  const setNewVenue = () => setIsNewVenue(true);

  return (
    <div>
      <MainTitle>Venues</MainTitle>
      <FlexContainer>
        <Button
          color="generic"
          onClick={setNewVenue}
        >
          New Venue
        <ButtonIcon spaceLeft>
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </ButtonIcon>
        </Button>
      </FlexContainer>
      <ScrollableContainer padding="0" heightDiff={267}>
        <VenuesList />
      </ScrollableContainer>
      {
        isNewVenue && <NewVenueFormDialog isNewVenue={isNewVenue} setIsNewVenue={setIsNewVenue} />
      }
    </div>
  )
}
