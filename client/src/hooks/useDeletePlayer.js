import { useMutation, queryCache } from "react-query";
import { deletePlayer } from "../api";

export default function useDeletePlayer(cb) {
  const [savePlayers] = useMutation((player) => deletePlayer(player.getId()), {
    onMutate: (player) => {
      const queryKey = `players-${player.getTeamId()}`;
      queryCache.cancelQueries(queryKey);
      const previousValue = queryCache.getQueryData(queryKey);

      queryCache.setQueryData(queryKey, (oldPlayers) => {
        return [...oldPlayers.filter((p) => p.id !== player.getId())];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      return queryCache.setQueryData(
        `players-${variables.teamId}`,
        previousValue
      );
    },
    onSuccess: () => {
      if (cb) cb();
    },
    onSettled: (data, err, variables) => {
      queryCache.refetchQueries(`players-${variables.teamId}`);
    },
  });

  return savePlayers;
}
