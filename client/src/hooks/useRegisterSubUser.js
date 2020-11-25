import { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import shortid from 'shortid';
import { registerUser } from '../api';

export default function useRegisterSubUser(cb) {
  const [status, setStatus] = useState();
  const [registerSubUser] = useMutation((user) => registerUser(user), {
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

  return { registerSubUser, status };
}
