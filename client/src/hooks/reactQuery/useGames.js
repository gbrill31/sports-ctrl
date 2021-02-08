import { useQuery } from 'react-query';
import { getAllGames } from '../../api';

export default function useGames(isAllowed) {
  return useQuery({
    queryKey: 'all-games',
    queryFn: getAllGames,
    enabled: isAllowed,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
