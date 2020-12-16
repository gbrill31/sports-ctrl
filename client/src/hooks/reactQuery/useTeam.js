import { useQuery } from 'react-query';
import { getTeamById } from '../../api';
import Team from '../../classes/Team';

export default function useTeam(teamId) {
  let team;
  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: [`team-${teamId}`, teamId],
    queryFn: getTeamById,
    enabled: teamId,
    refetchOnWindowFocus: false,
  });
  if (status === 'success' && data) {
    team = new Team(data);
  }
  return { status, data: team, error, isFetching, refetch };
}
