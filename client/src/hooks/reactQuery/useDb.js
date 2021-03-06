import { useQuery } from 'react-query';
import { connectDB } from '../../api';

export default function useDb() {
  return useQuery({
    queryKey: 'dbConnection',
    queryFn: connectDB,
    refetchOnWindowFocus: false,
    retry: 5,
    retryDelay: 15000,
  });
}
