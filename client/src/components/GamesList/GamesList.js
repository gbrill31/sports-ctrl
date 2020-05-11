import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { MainTitle, Button } from '../../styledElements';

import ComponentLoader from '../../components/ComponentLoader/ComponentLoader';
import GameItem from '../GameItem/GameItem';


const ListWrapper = styled.div`
    margin: 15px 0 15px 0;
    
    &:nth-child(2n) {
      background-color: #e2e2e2;
    }
`;

export default function GamesList({ games, isLoading }) {
  const history = useHistory();
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    if (games && !activeGame) {
      setActiveGame(games.find(game => game.active));
    }
  }, [games, activeGame]);

  const goToActiveGame = () => {
    history.push('/game');
  }

  return (
    <>
      <ComponentLoader loading={isLoading}>
        {
          activeGame && (
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
        <ListWrapper>
          {
            games && games
              .filter(game => !game.active)
              .map(game => <GameItem key={game.id} game={game} />)
          }
        </ListWrapper>
      </ComponentLoader>
    </>
  );
}
