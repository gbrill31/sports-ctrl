import { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import shortid from 'shortid';
import { saveNewTeam } from '../api';

export default function useSaveTeam(cb) {
  const [status, setStatus] = useState();
  const [saveTeam] = useMutation((team) => saveNewTeam(team), {
    onMutate: (team) => {
      setStatus('pending');
      queryCache.cancelQueries('teams');

      const previousValue = queryCache.getQueryData('teams');

      queryCache.setQueryData('teams', (oldTeams) => {
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
      return queryCache.setQueryData('teams', previousValue);
    },
    onSuccess: () => {
      setStatus('success');
      if (cb) cb();
    },
    onSettled: () => queryCache.refetchQueries('teams'),
  });

  return { saveTeam, status };
}
