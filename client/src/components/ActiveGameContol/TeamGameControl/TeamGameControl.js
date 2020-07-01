import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import PlayerControlItem from "../PlayerGameControlItem/PlayerGameControlItem";
import FilterListInput from "../../FilterListInput/FilterListInput";

import {
  MainTitle,
  FlexContainer,
  ScrollableContainer,
} from "../../../styledElements";

const TeamControlContainer = styled.div`
  /* padding: 0 15px 0 0; */
`;

const ScoreContainer = styled.div`
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  margin: 0 10px;
  text-align: center;
`;

const FoulsContainer = styled.div`
  color: ${(props) => (props.danger ? props.theme.error.color : "#fff")};
  font-size: 2rem;
  font-weight: bold;
  margin: 0 5px;
  text-align: center;
`;

function TeamGameControl({
  teamLocation,
  team,
  borderRight,
  points,
  fouls,
  gameId,
}) {
  const [filterValue, setFilterValue] = useState("");

  return (
    team && (
      <TeamControlContainer>
        <FlexContainer column justify="center" align="center">
          <MainTitle soft uppercase>
            {teamLocation}
          </MainTitle>
          <ScoreContainer>{`${points}pt`}</ScoreContainer>
        </FlexContainer>
        <MainTitle align="center" capitalize>
          {team.getName()}
        </MainTitle>
        <FoulsContainer danger={fouls > 3}>
          {`Team Fouls: ${fouls}`}
        </FoulsContainer>

        <FilterListInput
          onChange={setFilterValue}
          placeholder="Type Name or Number"
        />
        <ScrollableContainer heightDiff={370} fullWidth>
          <FlexContainer column align="center" borderRight={borderRight}>
            {team.getPlayers("name", filterValue).map((player) => (
              <PlayerControlItem
                key={player.getId()}
                player={player}
                gameId={gameId}
                roundLeft={teamLocation === "home"}
              />
            ))}
          </FlexContainer>
        </ScrollableContainer>
      </TeamControlContainer>
    )
  );
}

TeamGameControl.propTypes = {
  teamLocation: PropTypes.string,
  team: PropTypes.object,
  borderRight: PropTypes.bool,
  points: PropTypes.number,
  fouls: PropTypes.number,
  gameId: PropTypes.number.isRequired,
};

export default React.memo(TeamGameControl);
