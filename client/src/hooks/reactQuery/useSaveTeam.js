import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import shortid from 'shortid';
import { saveNewTeam } from '../../api';

export default function useSaveTeam(cb) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState();
  const saveTeam = useMutation((team) => saveNewTeam(team), {
    onMutate: async (team) => {
      setStatus('pending');
      await queryClient.cancelQueries('teams');

      const previousValue = queryClient.getQueryData('teams');

      queryClient.setQueryData('teams', (oldTeams) => {
        const teams = team.id
          ? [...oldTeams.filter((t) => t.id !== team.id)]
          : [...oldTeams];
        return [
          ...teams,
          { ...team, id: team.id ? team.id : shortid.generate() },
        ];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      setStatus('failed');
      return queryClient.setQueryData('teams', previousValue);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
      setStatus('success');
      if (cb) cb();
    },
    onSettled: () => queryClient.refetchQueries('teams'),
  });

  return { saveTeam: saveTeam.mutate, status };
}
