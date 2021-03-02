import React from 'react';

import GameClock from './GameClocksControl/GameClock/GameClock';
import AttackClock from './GameClocksControl/AttackClock/AttackClock';
import QuarterControl from './QuarterControl/QuarterControl';

import { FlexContainer, SubTitle } from '../../styledElements';
import TimeoutClock from './GameClocksControl/TimeoutClock/TimeoutClock';

export default function GameStateControl({ league }) {
  return (
    <FlexContainer column justify="center" align="center" borderRight>
      <FlexContainer align="center" justify="center" padding="0">
        <TimeoutClock league={league} />
      </FlexContainer>
      <SubTitle align="center" padding="0">
        {league && league.name}
      </SubTitle>

      <SubTitle soft uppercase align="center" padding="5px">
        Game State Control
      </SubTitle>
      <FlexContainer column justify="center" align="center">
        {league && (
          <>
            <QuarterControl league={league} />
            <GameClock league={league} />
            <AttackClock league={league} />
          </>
        )}
      </FlexContainer>
    </FlexContainer>
  );
}
