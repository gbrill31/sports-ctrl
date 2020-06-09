import React from 'react';


import GameClock from './GameClocksControl/GameClock/GameClock';
import AttackClock from './GameClocksControl/AttackClock/AttackClock';
import QuarterControl from './QuarterControl/QuarterControl';

import {
  FlexContainer, MainTitle
} from '../../styledElements';

export default function GameStateControl() {
  return (
    <FlexContainer column justify="space-evenly" align="center" borderRight>
      <MainTitle soft uppercase>Game State Control</MainTitle>
      <QuarterControl />
      <GameClock />
      <AttackClock />
    </FlexContainer>
  )
}
