import React from 'react';
import { MainTitle, FlexContainer } from '../../styledElements';
import NewVenueForm from '../../components/NewVenueForm/NewVenueForm';
import VenuesList from '../../components/VenuesList/VenuesList';


export default function Venues() {
  return (
    <div>
      <MainTitle>
        Venues
      </MainTitle>
      <NewVenueForm />
      <FlexContainer>
        <VenuesList />
      </FlexContainer>
    </div>
  )
}
