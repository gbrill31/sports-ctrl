import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Button, FlexContainer, Icon, SubTitle } from '../../styledElements';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import GamesPlayedList from '../GamesPlayedList/GamesPlayedList';
import useActiveGame from '../../hooks/reactQuery/useActiveGame';
import HomeGameListItem from '../HomeGameListItem/HomeGameListItem';
import CreateGameForm from '../CreateGameForm/CreateGameForm';

export default function GamesControl() {
  const history = useHistory();
  const queryClient = useQueryClient();

  const [isStartNewGame, setIsStartNewGame] = useState(false);

  const {
    status: activeGameStatus,
    data: activeGame,
    // refetch: fetchActiveGame,
  } = useActiveGame(queryClient.getQueryData('dbConnection') !== undefined);

  // const { currentRoute } = useSelector((state) => state.routes);

  // useEffect(() => {
  //   if (currentRoute === '/') {
  //     console.log('fetch active game');
  //     fetchActiveGame();
  //   }
  // }, [currentRoute, fetchActiveGame]);

  const showNewGameForm = () => setIsStartNewGame(true);
  const hideNewGameForm = () => setIsStartNewGame(false);

  const goToActiveGame = () => {
    history.push('/game');
  };

  return (
    activeGameStatus === 'success' && (
      <>
        <FlexContainer
          fullWidth
          align="center"
          justify="center"
          minHeight="250px"
          padding="0"
        >
          {!activeGame && (
            <>
              {!isStartNewGame ? (
                <Button color="success" onClick={showNewGameForm} width="50%">
                  Start A New Game
                  <Icon spaceLeft>
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                  </Icon>
                </Button>
              ) : (
                <CreateGameForm cancelNewGame={hideNewGameForm} />
              )}
            </>
          )}
          {activeGame?.id && (
            <>
              <SubTitle>Active Game</SubTitle>
              <HomeGameListItem goToActive={goToActiveGame} game={activeGame} />
            </>
          )}
        </FlexContainer>
        <GamesPlayedList />
      </>
    )
  );
}
