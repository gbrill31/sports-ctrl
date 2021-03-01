import { useMutation, useQueryClient } from 'react-query';
import { deleteLeague } from '../../api';

export default function useDeleteLeague(cb) {
  const queryClient = useQueryClient();
  const deleteSelectedVenue = useMutation((id) => deleteLeague(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries('leagues');

      const previousValue = queryClient.getQueryData('leagues');

      queryClient.setQueryData('leagues', (oldLeagues) => {
        return oldLeagues
          ? [...oldLeagues.filter((league) => league.id !== id)]
          : [];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData('leagues', previousValue),
    onSuccess: () => {
      queryClient.invalidateQueries('leagues');
      if (cb) cb();
    },
    onSettled: () => queryClient.refetchQueries('leagues'),
  });
  return deleteSelectedVenue.mutate;
}
