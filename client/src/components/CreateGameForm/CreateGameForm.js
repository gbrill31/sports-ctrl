import React, { useState } from "react";
import { faBasketballBall } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";
import { FlexContainer, MainTitle, Button, Icon } from "../../styledElements";
import useVenues from "../../hooks/useVenues";
import useTeams from "../../hooks/useTeams";
import useDb from "../../hooks/useDb";
import useActiveGame from "../../hooks/useActiveGame";
import useCreateGame from "../../hooks/useCreateGame";

export default function CreateGameForm() {
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [venue, setVenue] = useState(null);

  const { status: dbStatus } = useDb();

  const {
    status: activeGameStatus,
    // data: activeGame,
    isFetching: isActiveGameFetching,
  } = useActiveGame(dbStatus === "success");

  const isGameLoading = () =>
    activeGameStatus === "loading" || isActiveGameFetching;

  const {
    status: venuesStatus,
    data: venues,
    isFetching: isVenuesFetching,
  } = useVenues(dbStatus === "success");

  const {
    status: teamsStatus,
    data: teams,
    isFetching: isTeamsFetching,
  } = useTeams(dbStatus === "success");

  const createGame = useCreateGame();

  const selectVanue = (venueId) => {
    setVenue(venues.find((v) => v.id === venueId));
  };

  const selecteHomeTeam = (teamId) => {
    setHomeTeam(teams.find((t) => t.getId() === teamId));
  };
  const selecteAwayTeam = (teamId) => {
    setAwayTeam(teams.find((t) => t.getId() === teamId));
  };

  const startNewGame = () => {
    const game = {
      home: homeTeam.getName(),
      homeId: homeTeam.getId(),
      away: awayTeam.getName(),
      awayId: awayTeam.getId(),
      venue: venue.name,
      active: true,
    };
    createGame(game);
  };

  const getTeamsSelectionList = (team) => {
    return team ? teams.filter((t) => t.getId() !== team.getId()) : teams;
  };

  return (
    <>
      <MainTitle>Select Teams and Venue</MainTitle>
      <FlexContainer align="baseline" justify="center">
        <AutoCompleteInput
          id="home"
          color="#fff"
          spaceLeft
          selectedValue={homeTeam ? homeTeam.getName() : ""}
          options={getTeamsSelectionList(awayTeam)}
          getOptionLabel={(option) => option.name}
          placeholder="Select Home Team"
          onSelection={selecteHomeTeam}
          loading={teamsStatus === "loading" || isTeamsFetching}
        />
        <MainTitle>VS</MainTitle>
        <AutoCompleteInput
          id="away"
          color="#fff"
          spaceLeft
          selectedValue={awayTeam ? awayTeam.getName() : ""}
          options={getTeamsSelectionList(homeTeam)}
          getOptionLabel={(option) => option.name}
          placeholder="Select Away Team"
          onSelection={selecteAwayTeam}
          loading={teamsStatus === "loading" || isTeamsFetching}
        />
        <MainTitle>AT</MainTitle>
        <AutoCompleteInput
          id="vanues"
          color="#fff"
          spaceLeft
          selectedValue={venue ? venue.name : ""}
          options={venues}
          getOptionLabel={(option) => option.name}
          placeholder="Select Vanue"
          onSelection={selectVanue}
          loading={venuesStatus === "loading" || isVenuesFetching}
        />
        <Button color="success" onClick={startNewGame} saving={isGameLoading()}>
          {isGameLoading() ? "Starting..." : "Start Game"}
          <Icon spaceLeft>
            <FontAwesomeIcon icon={faBasketballBall} size="sm" />
          </Icon>
        </Button>
      </FlexContainer>
    </>
  );
}
