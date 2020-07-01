import React from "react";
import { MainTitle, GridContainer } from "../../styledElements";

import TeamsList from "../../components/TeamsManagementControl/TeamsManagementList/TeamsManagementList";
import PlayersList from "../../components/PlayersManagementControl/PlayersList/PlayersList";

export default function Teams() {
  return (
    <>
      <MainTitle>Teams Management</MainTitle>
      <GridContainer columnsSpread="auto auto" noPadding>
        <TeamsList />
        <PlayersList />
      </GridContainer>
    </>
  );
}
