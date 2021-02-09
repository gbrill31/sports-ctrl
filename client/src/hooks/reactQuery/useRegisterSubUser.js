import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import shortid from 'shortid';
import { registerUser } from '../../api';

export default function useRegisterSubUser(cb) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState();
  const registerSubUser = useMutation(
    (user) => {
      const { name, email, type, oldEmail, admin } = user;
      registerUser(name, email, null, type, admin, oldEmail);
    },
    {
      onMutate: async (user) => {
        setStatus('pending');
        await queryClient.cancelQueries('users');

        const previousValue = queryClient.getQueryData('users');

        queryClient.setQueryData('users', (oldUsers) => {
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
        return queryClient.setQueryData('users', previousValue);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        setStatus('success');
        if (cb) cb();
      },
      onSettled: () => queryClient.refetchQueries('users'),
    }
  );

  return { registerSubUser: registerSubUser.mutate, status };
}
