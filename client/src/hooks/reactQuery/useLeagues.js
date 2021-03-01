import { useQuery } from 'react-query';
import { getAllLeagues } from '../../api';

export default function useLeagues(isAllowed) {
  return useQuery({
    queryKey: 'leagues',
    queryFn: getAllLeagues,
    enabled: isAllowed,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
