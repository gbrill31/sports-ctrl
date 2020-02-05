import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NewGameDialog from '../../components/NewGameDialog/NewGameDialog';
import GamesList from '../../components/GamesList/GamesList';

import './Home.scss';

import {
  getAllGames
} from '../../actions/HomeActions';

const mapStateToProps = state => ({
  games: state.gamesPlayed.games
});

const mapDispatchToProps = dispatch => ({
  getPlayedGames: () => dispatch(getAllGames())
});


function Home({ games, getPlayedGames, isDbConnected }) {
  const [isNewGame, setIsNewGame] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const createNewGame = (teams) => {
    setIsSaving(true);
    const body = JSON.stringify(teams);
    fetch('/game/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(res => res.json())
      .then(data => {
        setIsSaving(false);
        setIsNewGame(false);
      })
      .catch(err => console.log(err));
  }


  // const openNewGame = () => {
  //   setIsNewGame(true);
  // };

  const handleClose = () => {
    setIsNewGame(false);
  };

  useEffect(() => {
    if (isDbConnected) {
      getPlayedGames();
    }
  }, [isDbConnected, getPlayedGames]);

  const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: #762390;
  border: 1px solid #762070;
  display: inline-block;
  `;

  return (
    <div>
      <Title>Games</Title>
      <GamesList games={games} />
      <NewGameDialog
        isOpen={isNewGame}
        handleClose={handleClose}
        handleConfirm={createNewGame}
        isSaving={isSaving}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);