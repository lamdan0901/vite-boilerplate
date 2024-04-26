import { useQuery } from '@tanstack/react-query';
import axios from 'config/axios';
import { getToken } from 'utils/token';

export const currentUserKey = ['current-user'];

export function useCurrentUser() {
  const tokenData = getToken()?.data;
  const userData = useQuery(
    ['user-data', tokenData?.isAdmin],
    async () =>
      axios
        .get<{ data: { isPrimaryContact: boolean } }>('/user/info')
        .then((res) => res.data),
    {
      enabled: !tokenData?.isAdmin,
      staleTime: Infinity,
      retry: 0,
    },
  );
  const isPrimaryContact = userData.data?.data.isPrimaryContact;

  const queryFn = async () => {
    return { ...tokenData, isPrimaryContact };
  };

  return useQuery([currentUserKey, isPrimaryContact], queryFn, {
    staleTime: 0,
  });
}
