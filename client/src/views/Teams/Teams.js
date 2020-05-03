import React, { useState, useEffect } from 'react';
import { MainTitle, FlexContainer, Button, ButtonIcon } from '../../styledElements';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TeamsList from '../../components/TeamsControl/TeamsList/TeamsList';
import PlayersList from '../../components/PlayersControl/PlayersList/PlayersList';
import NewTeamFormDialog from '../../components/TeamsControl/NewTeamFormDialog/NewTeamFormDialog';
import NewPlayerFormDialog from '../../components/PlayersControl/NewPlayerFormDialog/NewPlayerFormDialog';

import Player from '../../classes/Player';

import { getPlayersByTeam } from '../../api';

export default function Teams() {
  const [isNewTeam, setIsNewTeam] = useState(false);
  const [isNewPlayer, setIsNewPlayer] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [players, setPlayers] = useState(null);

  const openNewTeam = () => setIsNewTeam(true);
  const openNewPlayer = () => setIsNewPlayer(true);

  const getMappedPlayers = (p) => p.map(player => new Player(player));

  useEffect(() => {
    if (selectedTeam) {
      getPlayersByTeam(selectedTeam.id)
        .then(players => setPlayers(getMappedPlayers(players)));
    }
  }, [selectedTeam]);

  const updatePlayers = (addedPlayers) => {
    setPlayers(getMappedPlayers([...players, ...addedPlayers]));
  }

  return (
    <div>
      <MainTitle>Teams</MainTitle>
      <FlexContainer>
        <Button
          color="generic"
          onClick={openNewTeam}
        >
          New Team
        <ButtonIcon spaceLeft>
            <FontAwesomeIcon icon={faPlus} size="sm" />
          </ButtonIcon>
        </Button>
        {
          selectedTeam && (
            <Button
              color="success"
              onClick={openNewPlayer}
              justifyRight
            >
              Add Players
              <ButtonIcon spaceLeft>
                <FontAwesomeIcon icon={faPlus} size="sm" />
              </ButtonIcon>
            </Button>
          )
        }
      </FlexContainer>
      <FlexContainer>
        <FlexContainer column>
          <TeamsList selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
        </FlexContainer>
        <FlexContainer column>
          <PlayersList players={players} />
        </FlexContainer>
      </FlexContainer>
      {
        isNewTeam && <NewTeamFormDialog isNewTeam={isNewTeam} setIsNewTeam={setIsNewTeam} />
      }
      {
        isNewPlayer && (
          <NewPlayerFormDialog
            isNewPlayer={isNewPlayer}
            setIsNewPlayer={setIsNewPlayer}
            selectedTeam={selectedTeam}
            updatePlayers={updatePlayers}
          />
        )
      }
    </div>
  )
}
