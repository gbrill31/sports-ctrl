import React from 'react';
import { Title, FlexContainer } from '../../styledComponents';
import NewVenueForm from '../NewVenueForm/NewVenueForm';
import VenuesList from '../VenuesList/VenuesList';


export default function Venues() {
  return (
    <div>

      <Title>
        Venues
      </Title>
      <NewVenueForm />
      <FlexContainer>
        <VenuesList />
      </FlexContainer>
    </div>
  )
}
