import { useMutation, useQueryClient } from 'react-query';
import { deleteVenue } from '../../api';

export default function useDeleteVenue(cb) {
  const queryClient = useQueryClient();
  const deleteSelectedVenue = useMutation((id) => deleteVenue(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries('venues');

      const previousValue = queryClient.getQueryData('venues');

      queryClient.setQueryData('venues', (oldVenues) => {
        return oldVenues
          ? [...oldVenues.filter((venue) => venue.id !== id)]
          : [];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData('venues', previousValue),
    onSuccess: () => {
      queryClient.invalidateQueries('venues');
      if (cb) cb();
    },
    onSettled: () => queryClient.refetchQueries('venues'),
  });
  return deleteSelectedVenue.mutate;
}
