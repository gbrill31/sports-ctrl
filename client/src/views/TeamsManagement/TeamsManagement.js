import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  MainTitle, FlexContainer, Button, ButtonIcon, GridContainer, ScrollableContainer,
  Input, ClearButton
} from '../../styledElements';
import { faPlus, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFormInput from '../../hooks/useFormInput';

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
  const [isFilterTeams, setIsFilterTeams] = useState(false);
  const [isFilterPlayers, setIsFilterPlayers] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState(null);
  const filterTeamsInput = useFormInput('');
  const filterPlayersInput = useFormInput('');

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
      setSelectedPlayer(null);
      getPlayersByTeam(selectedTeam.getId())
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

  const openFilterTeams = () => setIsFilterTeams(true);
  const closeFilterTeams = () => setIsFilterTeams(false);
  const openFilterPlayers = () => setIsFilterPlayers(true);
  const closeFilterPlayers = () => setIsFilterPlayers(false);

  const clearFilterTeams = () => { filterTeamsInput.setValue('') };
  const clearFilterPlayers = () => { filterPlayersInput.setValue('') };

  const getFilteredTeams = () => {
    const value = filterTeamsInput.value.toLowerCase();
    return isFilterTeams ? teams
      .filter(team => team.getName().includes(value) || team.getLeague().includes(value) || team.getCountry().includes(value)) : teams;
  }

  const getFilteredPlayers = () => {
    const value = filterPlayersInput.value.toLowerCase();
    return isFilterPlayers ? players
      .filter(player => player.getName().includes(value) || player.getNumber().toString().includes(value)) : players;
  }

  return (
    <div>
      <MainTitle>Teams</MainTitle>
      <GridContainer columnsSpread="1fr 2fr">
        <FlexContainer column borderRight>
          <FlexContainer fullWidth>
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
              !isFilterTeams ? (
                <Button
                  color="secondary"
                  onClick={openFilterTeams}
                  justifyRight
                >
                  Filter
                  <ButtonIcon spaceLeft>
                    <FontAwesomeIcon icon={faFilter} size="sm" />
                  </ButtonIcon>
                </Button>
              ) : (
                  <>
                    <Button
                      color="error"
                      onClick={closeFilterTeams}
                      justifyRight
                    >
                      Close Filter
                    <ButtonIcon spaceLeft>
                        <FontAwesomeIcon icon={faTimes} size="sm" />
                      </ButtonIcon>
                    </Button>
                    <FlexContainer align="center" fullWidth>
                      <FlexContainer padding="0" width="85%">
                        <Input
                          type="text"
                          placeholder="Team Name, League, Country"
                          value={filterTeamsInput.value}
                          onChange={filterTeamsInput.onChange}
                          color="#fff"
                          width="100%"
                        />
                        <ClearButton
                          color="#fff"
                          show={filterTeamsInput.value.length > 0}
                          onClick={clearFilterTeams}
                        >
                          <ButtonIcon>
                            <FontAwesomeIcon icon={faTimes} size="sm" />
                          </ButtonIcon>
                        </ClearButton>
                      </FlexContainer>
                    </FlexContainer>
                  </>
                )
            }
          </FlexContainer>
          <ScrollableContainer padding="5px">
            <TeamsList teams={getFilteredTeams()} selectedTeam={selectedTeam} setSelectedTeam={setSelectedTeam} />
          </ScrollableContainer>
        </FlexContainer>
        <FlexContainer>
          <FlexContainer fullWidth>
            {
              selectedTeam && (
                <>
                  <Button
                    color="success"
                    onClick={openNewPlayer}
                  >
                    Add Players
                  <ButtonIcon spaceLeft>
                      <FontAwesomeIcon icon={faPlus} size="sm" />
                    </ButtonIcon>
                  </Button>
                  {
                    !isFilterPlayers ? (
                      <Button
                        color="secondary"
                        onClick={openFilterPlayers}
                        justifyRight
                      >
                        Filter
                        <ButtonIcon spaceLeft>
                          <FontAwesomeIcon icon={faFilter} size="sm" />
                        </ButtonIcon>
                      </Button>
                    ) : (
                        <>
                          <Button
                            color="error"
                            onClick={closeFilterPlayers}
                            justifyRight
                          >
                            Close Filter
                          <ButtonIcon spaceLeft>
                              <FontAwesomeIcon icon={faFilter} size="sm" />
                            </ButtonIcon>
                          </Button>
                          <FlexContainer align="center" fullWidth>
                            <FlexContainer padding="0" width="85%">
                              <Input
                                type="text"
                                placeholder="Player Name, Number"
                                value={filterPlayersInput.value}
                                onChange={filterPlayersInput.onChange}
                                color="#fff"
                                width="100%"
                              />
                              <ClearButton
                                color="#fff"
                                show={filterPlayersInput.value.length > 0}
                                onClick={clearFilterPlayers}
                              >
                                <ButtonIcon>
                                  <FontAwesomeIcon icon={faTimes} size="sm" />
                                </ButtonIcon>
                              </ClearButton>
                            </FlexContainer>
                          </FlexContainer>
                        </>
                      )
                  }
                </>
              )
            }
          </FlexContainer>
          <ScrollableContainer padding="5px">
            <PlayersList
              players={getFilteredPlayers()}
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
