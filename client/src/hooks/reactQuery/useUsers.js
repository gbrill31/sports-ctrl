import { useQuery } from 'react-query';
import { getUsersByAdmin } from '../../api';
import { permissions } from '../../services/userPermissions';

export default function useUsers(isLoad) {
  return useQuery({
    queryKey: 'users',
    queryFn: getUsersByAdmin,
    enabled: isLoad,
    refetchOnWindowFocus: false,
    onSuccess: (users) => {
      return users.map((user) =>
        Object.assign(user, { permissions: permissions[user.type] })
      );
    },
  });
}
