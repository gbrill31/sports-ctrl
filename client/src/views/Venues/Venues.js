import React, { useState } from 'react';
import { MainTitle, FlexContainer, Button, ButtonIcon } from '../../styledElements';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewVenueFormDialog from '../../components/VenuesControl/NewVenueFormDIalog/NewVenueFormDialog';
import VenuesList from '../../components/VenuesControl/VenuesList/VenuesList';


export default function Venues() {
  const [isNewVenue, setIsNewVenue] = useState(false);

  const setNewVenue = () => setIsNewVenue(true);

  return (
    <div>
      <MainTitle>
        Venues
      </MainTitle>
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
      <FlexContainer>
        <VenuesList />
      </FlexContainer>
      {
        isNewVenue && <NewVenueFormDialog isNewVenue={isNewVenue} setIsNewVenue={setIsNewVenue} />
      }
    </div>
  )
}
