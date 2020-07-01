import React from "react";
import { MainTitle, GridContainer } from "../../styledElements";

import TeamsManagementControl from "../../components/TeamsManagementControl/TeamsManagementList/TeamsManagementList";
import PlayersManagementList from "../../components/PlayersManagementControl/PlayersManagementList/PlayersManagementList";

export default function Teams() {
  return (
    <>
      <MainTitle>Teams Management</MainTitle>
      <GridContainer columnsSpread="auto auto" noPadding>
        <TeamsManagementControl />
        <PlayersManagementList />
      </GridContainer>
    </>
  );
}
