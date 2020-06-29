import { useMutation, queryCache } from "react-query";
import shortid from "shortid";
import { savePlayersToTeam } from "../api";

export default function useSavePlayers(cb) {
  const [savePlayers] = useMutation((players) => savePlayersToTeam(players), {
    onMutate: (players) => {
      const queryKey = `players-${
        Array.isArray(players) ? players[0].teamId : players.teamId
      }`;
      queryCache.cancelQueries(queryKey);
      const previousValue = queryCache.getQueryData(queryKey);

      queryCache.setQueryData(queryKey, (oldPlayers) => {
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
    onError: (err, variables, previousValue) => {
      queryCache.setQueryData(`players-${variables.teamId}`, previousValue);
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
