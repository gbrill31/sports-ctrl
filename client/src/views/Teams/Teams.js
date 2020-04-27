import React, { useState } from 'react';
import { MainTitle, FlexContainer, Button, ButtonIcon } from '../../styledElements';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TeamsList from '../../components/TeamsControl/TeamsList/TeamsList';
import NewTeamFormDialog from '../../components/TeamsControl/NewTeamFormDialog/NewTeamFormDialog';

export default function Teams() {
  const [isNewTeam, setIsNewTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const setNewTeam = () => setIsNewTeam(true);

  return (
    <div>
      <MainTitle>Teams</MainTitle>
      <FlexContainer>
        <Button
          color="generic"
          onClick={setNewTeam}
        >
          New Team
        <ButtonIcon spaceLeft>
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </ButtonIcon>
        </Button>
      </FlexContainer>
      <FlexContainer>
        <FlexContainer column>
          <TeamsList selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
        </FlexContainer>
        <FlexContainer column>
          <div>Players</div>
        </FlexContainer>
      </FlexContainer>
      {
        isNewTeam && <NewTeamFormDialog isNewTeam={isNewTeam} setIsNewTeam={setIsNewTeam} />
      }
    </div>
  )
}
