import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import shortid from 'shortid';
import { saveNewLeague } from '../../api';

export default function useSaveLeague(cb) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState();
  const saveLeague = useMutation((league) => saveNewLeague(league), {
    onMutate: async (league) => {
      setStatus('pending');
      await queryClient.cancelQueries('leagues');

      const previousValue = queryClient.getQueryData('leagues');

      queryClient.setQueryData('leagues', (oldLeagues) => {
        const leagues = league.id
          ? [...oldLeagues.filter((v) => v.id !== league.id)]
          : [...oldLeagues];
        return [
          ...leagues,
          { ...league, id: league.id ? league.id : shortid.generate() },
        ];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      setStatus('failed');
      return queryClient.setQueryData('leagues', previousValue);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('leagues');
      setStatus('success');
      if (cb) cb();
    },
    onSettled: () => queryClient.refetchQueries('leagues'),
  });

  return { saveLeague: saveLeague.mutate, status };
}
