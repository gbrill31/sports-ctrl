import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { Icon, MainTitle } from '../../styledElements';

import ComponentLoader from '../ComponentLoader/ComponentLoader';
import HomeGameListItem from '../HomeGameListItem/HomeGameListItem';
import useGames from '../../hooks/useGames';
import useDb from '../../hooks/useDb';
import { useSelector } from 'react-redux';
import TableDisplay from '../TableDisplay/TableDisplay';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const tableHeaders = [
  {
    id: 1,
    title: 'Home',
    sortable: true,
  },
  {
    id: 2,
    title: 'Home Score',
  },
  {
    id: 4,
    title: 'Away Score',
  },
  {
    id: 3,
    title: 'Away',
    sortable: true,
  },
  {
    id: 5,
    title: 'Venue',
    sortable: true,
  },
  {
    id: 6,
    title: 'Played',
    sortable: true,
  },
];

const WinnerField = styled.div`
  color: ${(props) =>
    props.winner ? props.theme.success.color : props.theme.secondary.color};
  font-weight: ${(props) => (props.winner ? 'bold' : '')};
`;

export default function HomeGamesList() {
  const history = useHistory();

  const [activeGame, setActiveGame] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const { status: dbStatus } = useDb();
  const { status, data: games, isFetching } = useGames(
    dbStatus === 'success',
    user.id
  );

  useEffect(() => {
    if (games?.length) {
      const active = games.find((game) => game.active);
      setActiveGame(active);
    }
  }, [games]);

  const isGamesLoading = () => status === 'loading' || isFetching;

  const goToActiveGame = () => {
    history.push('/game');
  };

  const getGamesWithWinners = () => {
    if (games) {
      const gamesToChange = [...games];
      gamesToChange.forEach((g) => {
        g.winner =
          g.homePoints > g.awayPoints
            ? 'home'
            : g.homePoints < g.awayPoints
            ? 'away'
            : '';
      });
      return gamesToChange;
    }
    return [];
  };

  const cells = useMemo(
    () => [
      {
        key: 'home',
        component: (data, item) => (
          <WinnerField winner={item.winner === 'home'}>{data}</WinnerField>
        ),
      },
      {
        key: 'homePoints',
        component: (data, item) => (
          <WinnerField winner={item.winner === 'home'}>{data}</WinnerField>
        ),
      },
      {
        key: 'awayPoints',
        component: (data, item) => (
          <WinnerField winner={item.winner === 'away'}>{data}</WinnerField>
        ),
      },
      {
        key: 'away',
        component: (data, item) => (
          <WinnerField winner={item.winner === 'away'}>{data}</WinnerField>
        ),
      },
      {
        key: 'venue',
      },
      {
        key: 'created_at',
        component: (data) => <>{moment(data).format('MMMM Do, YYYY')}</>,
      },
    ],
    []
  );

  return (
    <>
      <ComponentLoader loading={isGamesLoading()}>
        {activeGame && activeGame.id && (
          <>
            <MainTitle>Active Game</MainTitle>
            <HomeGameListItem goToActive={goToActiveGame} game={activeGame} />
          </>
        )}
        <MainTitle>Games Played</MainTitle>
        <TableDisplay
          headers={tableHeaders}
          cells={cells}
          cellsStyle={{ padding: '10px' }}
          items={getGamesWithWinners().filter((game) => !game.active)}
        />
      </ComponentLoader>
    </>
  );
}
