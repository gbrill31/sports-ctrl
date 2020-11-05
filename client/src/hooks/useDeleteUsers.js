import { useMutation, queryCache } from 'react-query';
import { deleteUsers } from '../api';

export default function useDeleteUsers(cb) {
  const [deleteSelectedUsers] = useMutation((id) => deleteUsers(id), {
    onMutate: (id) => {
      queryCache.cancelQueries('users');

      const previousValue = queryCache.getQueryData('users');

      queryCache.setQueryData('users', (oldUsers) => {
        return [...oldUsers.filter((user) => user.id !== id)];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) =>
      queryCache.setQueryData('users', previousValue),
    onSuccess: () => {
      if (cb) cb();
    },
    onSettled: () => queryCache.refetchQueries('users'),
  });

  return deleteSelectedUsers;
}
