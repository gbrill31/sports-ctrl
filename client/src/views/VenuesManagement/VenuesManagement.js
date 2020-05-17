import React from 'react';
import { MainTitle } from '../../styledElements';
import VenuesList from '../../components/VenuesManagementControl/VenuesList/VenuesList';


export default function VenuesManagement() {

  return (
    <>
      <MainTitle>Venues Management</MainTitle>
      <VenuesList />
    </>
  )
}
