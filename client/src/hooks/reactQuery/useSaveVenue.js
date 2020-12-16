import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import shortid from 'shortid';
import { saveNewVenue } from '../../api';

export default function useSaveVenue(cb) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState();
  const saveVenue = useMutation((venue) => saveNewVenue(venue), {
    onMutate: async (venue) => {
      setStatus('pending');
      await queryClient.cancelQueries('venues');

      const previousValue = queryClient.getQueryData('venues');

      queryClient.setQueryData('venues', (oldVenues) => {
        const venues = venue.id
          ? [...oldVenues.filter((v) => v.id !== venue.id)]
          : [...oldVenues];
        return [
          ...venues,
          { ...venue, id: venue.id ? venue.id : shortid.generate() },
        ];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      setStatus('failed');
      return queryClient.setQueryData('venues', previousValue);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('venues');
      setStatus('success');
      if (cb) cb();
    },
    onSettled: () => queryClient.refetchQueries('venues'),
  });

  return { saveVenue: saveVenue.mutate, status };
}
