import { useMutation, useQueryClient } from 'react-query';
import { deleteTeam } from '../../api';

export default function useDeleteTeam(cb) {
  const queryClient = useQueryClient();
  const deleteSelectedTeam = useMutation((id) => deleteTeam(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries('teams');

      const previousValue = queryClient.getQueryData('teams');

      queryClient.setQueryData('teams', (oldTeams) => {
        return oldTeams ? [...oldTeams.filter((team) => team.id !== id)] : [];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData('teams', previousValue),
    onSuccess: () => {
      queryClient.invalidateQueries('teams');
      if (cb) cb();
    },
    onSettled: () => queryClient.refetchQueries('teams'),
  });

  return deleteSelectedTeam.mutate;
}
