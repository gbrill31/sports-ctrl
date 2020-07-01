import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled, { keyframes, css } from "styled-components";

import { FlexContainer } from "../../styledElements";

const statChangeAnimation = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
`;

const StatDisplay = styled.div`
  color: ${(props) =>
    props.color ? props.theme[props.color].color : props.theme.success.color};
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  /* margin-right: 20px; */

  h4 {
    margin: 0;
    color: #777;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 400;
    /* margin-left: 15px; */
  }

  ${(props) =>
    props.update &&
    css`
      animation: ${statChangeAnimation} 0.2s ease-in-out alternate 2;
    `};
`;

function PlayerStatsDisplay({ stats }) {
  const isFirstRun = useRef(true);

  const [isFoulsUpdate, setIsFoulsUpdate] = useState(false);
  const [isPointsUpdate, setIsPointsUpdate] = useState(false);
  const [isFtUpdate, setIsFtUpdate] = useState(false);
  const [is2fgUpdate, setIs2fgUpdate] = useState(false);
  const [is3fgUpdate, setIs3fgUpdate] = useState(false);

  const twoPointsFG = stats["2FG"];
  const threePointsFG = stats["3FG"];

  useEffect(() => {
    if (!isFirstRun.current) {
      setIsFoulsUpdate(true);
      setTimeout(() => setIsFoulsUpdate(false), 350);
    }
  }, [stats.FOULS, setIsFoulsUpdate]);

  useEffect(() => {
    if (!isFirstRun.current) {
      setIsPointsUpdate(true);
      setTimeout(() => setIsPointsUpdate(false), 350);
    }
  }, [stats.PT, setIsPointsUpdate]);

  useEffect(() => {
    if (!isFirstRun.current) {
      setIs2fgUpdate(true);
      setTimeout(() => setIs2fgUpdate(false), 350);
    }
  }, [twoPointsFG, setIs2fgUpdate]);

  useEffect(() => {
    if (!isFirstRun.current) {
      setIs3fgUpdate(true);
      setTimeout(() => setIs3fgUpdate(false), 350);
    }
  }, [threePointsFG, setIs3fgUpdate]);

  useEffect(() => {
    if (!isFirstRun.current) {
      setIsFtUpdate(true);
      setTimeout(() => setIsFtUpdate(false), 350);
    }
  }, [stats.FT, setIsFtUpdate]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  });

  return (
    <FlexContainer
      fullWidth
      padding="5px"
      justify="center"
      align="center"
      bgColor="#eaeaea"
    >
      <FlexContainer justify="space-evenly" width="60%">
        <StatDisplay update={isPointsUpdate}>POINTS: {stats.PT}</StatDisplay>
        <StatDisplay
          color={stats.FOULS > 3 ? "error" : "primary"}
          update={isFoulsUpdate}
        >
          FOULS: {stats.FOULS}
        </StatDisplay>
      </FlexContainer>
      <FlexContainer
        width="60%"
        justify="space-evenly"
        align="center"
        padding="0"
      >
        <StatDisplay update={is2fgUpdate}>
          <h4>2FG: {stats["2FG"]}</h4>
        </StatDisplay>
        <StatDisplay update={is3fgUpdate}>
          <h4>3FG: {stats["3FG"]}</h4>
        </StatDisplay>
        <StatDisplay update={isFtUpdate}>
          <h4>FT: {stats.FT}</h4>
        </StatDisplay>
      </FlexContainer>
    </FlexContainer>
  );
}
PlayerStatsDisplay.propTypes = {
  stats: PropTypes.object.isRequired,
};

export default React.memo(PlayerStatsDisplay);
