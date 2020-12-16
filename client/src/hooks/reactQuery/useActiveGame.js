import { useQuery } from 'react-query';
import { getActiveGame } from '../../api';

export default function useActiveGame(isAllowed) {
  return useQuery({
    queryKey: 'active-game',
    queryFn: getActiveGame,
    enabled: isAllowed,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
