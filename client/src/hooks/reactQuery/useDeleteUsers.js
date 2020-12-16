import { useMutation, useQueryClient } from 'react-query';
import { deleteUsers } from '../../api';

export default function useDeleteUsers(cb) {
  const queryClient = useQueryClient();
  const deleteSelectedUsers = useMutation((id) => deleteUsers(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries('users');

      const previousValue = queryClient.getQueryData('users');

      queryClient.setQueryData('users', (oldUsers) => {
        return oldUsers ? [...oldUsers.filter((user) => user.id !== id)] : [];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData('users', previousValue),
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      if (cb) cb();
    },
    onSettled: () => queryClient.refetchQueries('users'),
  });

  return deleteSelectedUsers.mutate;
}
