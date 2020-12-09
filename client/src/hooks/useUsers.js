import { useQuery } from 'react-query';
import { getUsersByAdmin } from '../api';
import { permissions } from '../services/userPermissions';

export default function usePlayers(isLoad) {
  return useQuery(isLoad && 'users', getUsersByAdmin, {
    refetchOnWindowFocus: false,
    onSuccess: (users) => {
      return users.map((user) =>
        Object.assign(user, { permissions: permissions[user.type] })
      );
    },
  });
}
