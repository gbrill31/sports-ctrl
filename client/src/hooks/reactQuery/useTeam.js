import { useQuery } from 'react-query';
import { getTeamById } from '../../api';

export default function useTeam(teamId) {
  return useQuery({
    queryKey: `team-${teamId}`,
    queryFn: () => getTeamById(teamId),
    enabled: teamId,
    refetchOnWindowFocus: false,
  });
}
