import { useQuery } from 'react-query';
import { getAllVenues } from '../../api';

export default function useVenues(isAllowed) {
  return useQuery({
    queryKey: 'venues',
    queryFn: getAllVenues,
    enabled: isAllowed,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
