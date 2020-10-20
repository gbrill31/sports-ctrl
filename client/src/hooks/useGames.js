import { useQuery } from 'react-query';
import { getAllGames } from '../api';

export default function useGames(isAllowed) {
  return useQuery(isAllowed && 'all-games', getAllGames, {
    refetchOnWindowFocus: false,
    retry: false,
  });
}
