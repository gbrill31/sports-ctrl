import { useQuery } from 'react-query';
import { getAllVenues } from '../api';

export default function useVenues(isAllowed) {
  return useQuery(isAllowed && 'venues', getAllVenues, {
    refetchOnWindowFocus: false,
    retry: false,
  });
}
