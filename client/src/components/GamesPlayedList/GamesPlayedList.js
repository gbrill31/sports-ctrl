import React, { useMemo } from 'react';
import moment from 'moment';

import { FlexContainer, SubTitle } from '../../styledElements';

import ComponentLoader from '../ComponentLoader/ComponentLoader';
import useGames from '../../hooks/reactQuery/useGames';
import { useSelector } from 'react-redux';
import TableDisplay from '../TableDisplay/TableDisplay';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';
import useLeague from '../../hooks/reactQuery/useLeague';

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
    id: 8,
    title: '',
  },
  {
    id: 4,
    title: 'Away Score',
  },
  {
    id: 3,
    title: 'Away',
    sortable: true,
    style: {
      borderRight: '3px solid black',
    },
  },
  {
    id: 7,
    title: 'League',
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
    sortKey: 'created_at',
    sortable: true,
  },
];

const WinnerField = styled.div`
  color: ${(props) =>
    props.winner ? props.theme.success.color : props.theme.secondary.color};
  font-weight: ${(props) => (props.winner ? 'bold' : '')};
`;

const VSField = styled.div`
  font-weight: bold;
`;

const LeagueField = ({ id }) => {
  const { data: league } = useLeague(id);
  return league ? <>{league.name}</> : null;
};

export default function GamesPlayedList() {
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const { status, data: games, isFetching } = useGames(
    queryClient.getQueryData('dbConnection') !== undefined,
    user.id
  );

  const isGamesLoading = () => status === 'loading' || isFetching;

  const getGamesWithWinners = () => {
    if (games) {
      const gamesLocalCopy = [...games];
      gamesLocalCopy.forEach((g) => {
        g.winner =
          g.homePoints > g.awayPoints
            ? 'home'
            : g.homePoints < g.awayPoints
            ? 'away'
            : '';
      });
      return gamesLocalCopy.filter((game) => !game.active);
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
        key: 'VS',
        component: () => <VSField>VS</VSField>,
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
        style: {
          borderRight: '3px solid black',
        },
      },
      {
        key: 'league',
        component: (data, item) => {
          return <LeagueField id={item.leagueId} />;
        },
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
        {getGamesWithWinners().length > 0 ? (
          <>
            <SubTitle>Games Played</SubTitle>
            <TableDisplay
              headers={tableHeaders}
              cells={cells}
              cellsStyle={{ padding: '10px' }}
              items={getGamesWithWinners()}
            />
          </>
        ) : (
          <FlexContainer fullWidth padding="0" align="center" justify="center">
            <SubTitle align="center">No Games Played Found</SubTitle>
          </FlexContainer>
        )}
      </ComponentLoader>
    </>
  );
}
