import { useQuery } from 'react-query';
import { getAllTeams } from '../../api';

export default function useTeams(isAllowed) {
  return useQuery({
    queryKey: 'teams',
    queryFn: getAllTeams,
    enabled: isAllowed,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
