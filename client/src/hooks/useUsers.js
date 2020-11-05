import { useQuery } from 'react-query';
import { getUsersByAdmin } from '../api';

export default function usePlayers(isLoad) {
  return useQuery(isLoad && 'users', getUsersByAdmin, {
    refetchOnWindowFocus: false,
  });
}
