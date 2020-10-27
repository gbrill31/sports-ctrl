import { useQuery } from 'react-query';
import { getAllGames } from '../api';

export default function useGames(isAllowed, userId) {
  return useQuery(isAllowed && ['all-games', userId], getAllGames, {
    refetchOnWindowFocus: false,
    retry: false,
  });
}
