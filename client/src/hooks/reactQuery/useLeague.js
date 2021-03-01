import { useQuery } from 'react-query';
import { getLeagueById } from '../../api';

export default function useLeague(leagueId) {
  return useQuery({
    queryKey: `league-${leagueId}`,
    queryFn: () => getLeagueById(leagueId),
    enabled: leagueId !== null,
    refetchOnWindowFocus: false,
  });
}
