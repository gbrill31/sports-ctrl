import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MainTitle, FlexContainer, Button, ButtonIcon, GridContainer, ScrollableContainer
} from '../../styledElements';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TeamsList from '../../components/TeamsControl/TeamsList/TeamsList';
import PlayersList from '../../components/PlayersControl/PlayersList/PlayersList';
import NewTeamFormDialog from '../../components/TeamsControl/NewTeamFormDialog/NewTeamFormDialog';
import NewPlayerFormDialog from '../../components/PlayersControl/NewPlayerFormDialog/NewPlayerFormDialog';

import Player from '../../classes/Player';
import { getAllTeams } from '../../actions';
import { getPlayersByTeam } from '../../api';

export default function Teams() {
  const dispatch = useDispatch();
  const [isNewTeam, setIsNewTeam] = useState(false);
  const [isNewPlayer, setIsNewPlayer] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState(null);

  const isDBConnected = useSelector(state => state.db.isConnected);
  const teams = useSelector(state => state.teams.items);

  const getTeams = useCallback(() => dispatch(getAllTeams()), [dispatch]);

  const openNewTeam = () => setIsNewTeam(true);
  const openNewPlayer = () => setIsNewPlayer(true);

  const getMappedPlayers = (p) => p.map(player => new Player(player));

  useEffect(() => {
    if (isDBConnected) {
      getTeams();
    }
  }, [getTeams, isDBConnected]);

  useEffect(() => {
    if (selectedTeam) {
      getPlayersByTeam(selectedTeam.id)
        .then(players => setPlayers(getMappedPlayers(players)));
    }
  }, [selectedTeam]);

  const updatePlayers = (addedPlayers) => {
    if (Array.isArray(addedPlayers)) {
      setPlayers(getMappedPlayers([...players, ...addedPlayers]));
    } else {
      setPlayers([...players.filter(p => p.getId() !== addedPlayers.id), new Player(addedPlayers)]);
    }
  }

  const deleteFromPlayer = (playerId) => {
    setPlayers(players.filter(p => p.getId() !== playerId));
  }

  return (
    <div>
      <MainTitle>Teams</MainTitle>
      <GridContainer columnsSpread="1fr 2fr">
        <FlexContainer column borderRight>
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
          </FlexContainer>
          <ScrollableContainer padding="5px">
            <TeamsList teams={teams} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
          </ScrollableContainer>
        </FlexContainer>
        <FlexContainer>
          <FlexContainer fullWidth>
            {
              selectedTeam && (
                <Button
                  color="success"
                  onClick={openNewPlayer}
                >
                  Add Players
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                  </ButtonIcon>
                </Button>
              )
            }
          </FlexContainer>
          <ScrollableContainer padding="5px">
            <PlayersList
              players={players}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              updatePlayers={updatePlayers}
              deleteFromPlayer={deleteFromPlayer}
            />
          </ScrollableContainer>
        </FlexContainer>
      </GridContainer>
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
