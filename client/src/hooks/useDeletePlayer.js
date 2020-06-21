import { useMutation, queryCache } from "react-query";
import { deletePlayer } from "../api";

export default function useDeletePlayer(cb) {
  const [savePlayers] = useMutation((playerId) => deletePlayer(playerId), {
    onMutate: (playerId) => {
      queryCache.cancelQueries("players");

      const previousValue = queryCache.getQueryData("players");

      queryCache.setQueryData("players", (oldPlayers) => {
        return [...oldPlayers.filter((p) => p.id !== playerId)];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryCache.setQueryData("players", previousValue),
    onSuccess: () => {
      if (cb) cb();
    },
    onSettled: () => queryCache.refetchQueries("players"),
  });

  return savePlayers;
}
