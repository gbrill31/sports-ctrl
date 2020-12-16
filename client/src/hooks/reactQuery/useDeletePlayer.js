import { useMutation, useQueryClient } from 'react-query';
import { deletePlayer } from '../../api';

export default function useDeletePlayer(cb) {
  const queryClient = useQueryClient();
  const deletePlayers = useMutation((player) => deletePlayer(player.getId()), {
    onMutate: async (player) => {
      const queryKey = `players-${player.getTeamId()}`;
      await queryClient.cancelQueries(queryKey);
      const previousValue = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldPlayers) => {
        return oldPlayers
          ? [...oldPlayers.filter((p) => p.id !== player.getId())]
          : [];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      return queryClient.setQueryData(
        `players-${variables.teamId}`,
        previousValue
      );
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(`players-${variables.teamId}`);
      if (cb) cb();
    },
    onSettled: (data, err, variables) => {
      queryClient.refetchQueries(`players-${variables.teamId}`);
    },
  });

  return deletePlayers.mutate;
}
