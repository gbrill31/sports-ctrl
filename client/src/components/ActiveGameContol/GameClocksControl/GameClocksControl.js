import React from 'react';
import GameClock from './GameClock/GameClock';
import AttackClock from './AttackClock/AttackClock';
import {
  FlexContainer
} from '../../../styledElements';

const ATTACK_TIME_SECONDS = 24;
const ATTACK_TIME_MILLISECONDS = ATTACK_TIME_SECONDS * 1000;

export default function GameClocksControl() {

  return (
    <>
      <FlexContainer justify="center">
        <GameClock />
        <AttackClock
          startTimeSeconds={ATTACK_TIME_SECONDS}
          startTimeMilliseconds={ATTACK_TIME_MILLISECONDS}
        />
      </FlexContainer>
    </>
  )
}
