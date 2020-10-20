import { useQuery } from 'react-query';
import { getActiveGame } from '../api';

export default function useActiveGame(isAllowed) {
  return useQuery(isAllowed && 'active-game', getActiveGame, {
    refetchOnWindowFocus: false,
    retry: false,
  });
}
