import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GamesList from '../../components/GamesList/GamesList';

import './Home.scss';

import {
  getAllGames
} from '../../actions';

const mapStateToProps = state => ({
  games: state.games.gamesPlayed,
  gamesLoading: state.games.getGamesPending
});

const mapDispatchToProps = dispatch => ({
  getPlayedGames: () => dispatch(getAllGames())
});


function Home({ games, getPlayedGames, isDbConnected, gamesLoading }) {

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
      <GamesList games={games} isLoading={gamesLoading} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);