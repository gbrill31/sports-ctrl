import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MainTitle, Button } from '../../styledElements';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import GameItem from '../GameItem/GameItem';


export default function GamesList() {
  const history = useHistory();

  const games = useSelector(state => state.games.played);
  const gamesLoading = useSelector(state => state.games.getGamesPending);
  const activeGame = useSelector(state => state.games.active);


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
              <Button
                noRaduis
                fullWidth
                color="success"
                onClick={goToActiveGame}
              >
                <GameItem game={activeGame} />
              </Button>
            </>
          )
        }
        <MainTitle>Games Played</MainTitle>
        {
          games && games
            .filter(game => !game.active)
            .map(game => <GameItem key={game.id} game={game} />)
        }
      </ComponentLoader>
    </>
  );
}
