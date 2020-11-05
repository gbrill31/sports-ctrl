import { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import shortid from 'shortid';
import { saveNewVenue } from '../api';

export default function useSaveVenue(cb) {
  const [status, setStatus] = useState();
  const [saveVenue] = useMutation((venue) => saveNewVenue(venue), {
    onMutate: (venue) => {
      setStatus('pending');
      queryCache.cancelQueries('venues');

      const previousValue = queryCache.getQueryData('venues');

      queryCache.setQueryData('venues', (oldVenues) => {
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
      return queryCache.setQueryData('venues', previousValue);
    },
    onSuccess: () => {
      setStatus('success');
      if (cb) cb();
    },
    onSettled: () => queryCache.refetchQueries('venues'),
  });

  return { saveVenue, status };
}
