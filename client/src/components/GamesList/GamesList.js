import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MainTitle, ScrollableContainer } from '../../styledElements';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import GameItem from '../GameItem/GameItem';


export default function GamesList() {
  const history = useHistory();

  const {
    items: games,
    getAllGamesPending: gamesLoading,
    active: activeGame
  } = useSelector(state => state.games);


  const goToActiveGame = () => {
    history.push('/game');
  }

  return (
    <>
      <ComponentLoader loading={gamesLoading}>
        {
          activeGame && activeGame.id && (
            <>
              <MainTitle>Active Game</MainTitle>
              <GameItem goToActive={goToActiveGame} game={activeGame} />
            </>
          )
        }
        <MainTitle>Games Played</MainTitle>
        <ScrollableContainer fullWidth heightDiff={activeGame ? 345 : 170}>
          {
            games && games
              .filter(game => !game.active)
              .map(game => <GameItem key={game.id} game={game} />)
          }
        </ScrollableContainer>
      </ComponentLoader>
    </>
  );
}
