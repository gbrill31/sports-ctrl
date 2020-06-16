import { useMutation, queryCache } from "react-query";
import shortid from "shortid";
import { savePlayersToTeam } from "../api";

export default function useSaveTeam(cb) {
  const [savePlayers] = useMutation((players) => savePlayersToTeam(players), {
    onMutate: (players) => {
      queryCache.cancelQueries("players");

      const previousValue = queryCache.getQueryData("players");

      queryCache.setQueryData("players", (oldPlayers) => {
        if (Array.isArray(players)) {
          const playersToAdd = players.map((player) => {
            return { ...player, id: player.id || shortid.generate() };
          });
          return [...oldPlayers, ...playersToAdd];
        }
        return [...oldPlayers.filter((p) => p.id !== players.id), players];
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
