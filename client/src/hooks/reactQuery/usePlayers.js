import { useQuery } from 'react-query';
import { getPlayersByTeamId } from '../../api';

export default function usePlayers(isLoad, teamId) {
  return useQuery({
    queryKey: `players-${teamId}`,
    queryFn: () => getPlayersByTeamId(teamId),
    enabled: isLoad,
    refetchOnWindowFocus: false,
  });
}
