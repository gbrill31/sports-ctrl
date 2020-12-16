import { useQuery } from 'react-query';
import { getPlayersByTeamId } from '../../api';
import Player from '../../classes/Player';

export default function usePlayers(isLoad, teamId) {
  let players;
  const { status, data, error, isFetching } = useQuery({
    queryKey: [`players-${teamId}`, teamId],
    queryFn: () => getPlayersByTeamId(teamId),
    enabled: isLoad,
    refetchOnWindowFocus: false,
  });
  if (status === 'success' && data) {
    players = data.map((player) => new Player(player));
  }
  return { status, data: players, error, isFetching };
}
