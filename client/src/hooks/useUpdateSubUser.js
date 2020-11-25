import { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import shortid from 'shortid';
import { updateUser } from '../api';

export default function useUpdateSubUser(cb) {
  const [status, setStatus] = useState();
  const [updateSubUser] = useMutation((user) => updateUser(user), {
    onMutate: (user) => {
      setStatus('pending');
      queryCache.cancelQueries('users');

      const previousValue = queryCache.getQueryData('users');

      queryCache.setQueryData('users', (oldUsers) => {
        const users = user.id
          ? [...oldUsers.filter((u) => u.id !== user.id)]
          : [...oldUsers];
        return [
          ...users,
          { ...user, id: user.id ? user.id : shortid.generate() },
        ];
      });

      return previousValue;
    },
    onError: (err, variables, previousValue) => {
      setStatus('failed');
      return queryCache.setQueryData('users', previousValue);
    },
    onSuccess: () => {
      setStatus('success');
      if (cb) cb();
    },
    onSettled: () => queryCache.refetchQueries('users'),
  });

  return { updateSubUser, status };
}
