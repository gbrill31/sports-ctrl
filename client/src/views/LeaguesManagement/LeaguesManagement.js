import React from 'react';
import { MainTitle } from '../../styledElements';
import LeaguesList from '../../components/LeaguesManagementControl/LeaguesList/LeaguesList';

export default function LeaguesManagement() {
  return (
    <>
      <MainTitle>Leagues Management</MainTitle>
      <LeaguesList />
    </>
  );
}
