import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import shortid from 'shortid';
import { savePlayersToTeam } from '../../api';

export default function useSavePlayers(cb) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState();
  const savePlayers = useMutation((players) => savePlayersToTeam(players), {
    onMutate: async (players) => {
      setStatus('pending');
      const queryKey = `players-${
        Array.isArray(players) ? players[0].teamId : players.teamId
      }`;
      await queryClient.cancelQueries(queryKey);
      const previousValue = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldPlayers) => {
        if (Array.isArray(players) && oldPlayers) {
          const playersToAdd = players.map((player) => {
            return { ...player, id: player.id || shortid.generate() };
          });
          return [...oldPlayers, ...playersToAdd];
        }
        return oldPlayers
          ? [...oldPlayers.filter((p) => p.id !== players.id), players]
          : [];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      setStatus('failed');
      return queryClient.setQueryData(
        `players-${variables.teamId}`,
        previousValue
      );
    },
    onSuccess: (data, vars) => {
      queryClient.invalidateQueries(
        `players-${Array.isArray(vars) ? vars[0].teamId : vars.teamId}`
      );
      setStatus('success');
      if (cb) cb();
    },
    onSettled: (data, err, variables) => {
      const id = Array.isArray(variables)
        ? variables[0].teamId
        : variables.teamId;
      queryClient.refetchQueries(`players-${id}`);
    },
  });

  return { savePlayers: savePlayers.mutate, status };
}
