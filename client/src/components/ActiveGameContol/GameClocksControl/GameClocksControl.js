import React from 'react';
import GameClock from './GameClock/GameClock';
import AttackClock from './AttackClock/AttackClock';
import {
  FlexContainer
} from '../../../styledElements';


export default function GameClocksControl() {

  return (
    <>
      <FlexContainer justify="center">
        <GameClock />
        <AttackClock />
      </FlexContainer>
    </>
  )
}
