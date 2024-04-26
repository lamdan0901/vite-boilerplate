import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'config/axios';
import { ADMIN_SUB_DOMAINS } from 'constants/common';
import { useToastMessage } from 'hooks/useToastMessage';
import { useRouter } from 'next/router';
import { getTenantName } from 'utils/common';
import { ApiResponse } from '../../interfaces/common';
import { removeToken, setToken } from '../../utils/token';
import { currentUserKey } from './queries';
import { LoginDto } from './validations';

interface LoginResponse
  extends ApiResponse<{
    access_token?: string;
    confirmationCode?: number;
    clientId?: number;
    otp?: number;
    email?: string;
    subDomain?: string;
  }> {}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const callback = router.query.callback as string;
  const loginUrl = callback ? window.location.href.split('?callback=')[1] : '/';
  const clientSubdomain = getTenantName(true);
  const isClient =
    !clientSubdomain || !ADMIN_SUB_DOMAINS.includes(clientSubdomain);

  const queryFn = async (data: LoginDto) => {
    const endpoint = isClient ? '/auth/login-client' : '/auth/login-admin';
    const res = await axios.post<LoginResponse>(endpoint, data);

    const token = res.data.data?.access_token;
    if (token) {
      removeToken();
      if (clientSubdomain) {
        setToken(token, data.remember);
      }
      queryClient.invalidateQueries(currentUserKey);
    }

    return res.data.data;
  };

  return useMutation(queryFn, {
    onSuccess: (data) => {
      setTimeout(() => {
        const tenantName = getTenantName();
        if (!tenantName && isClient) {
          const redirectUrl = window.location.href.replace(
            '://',
            `://${data?.subDomain}.`,
          );
          window.location.replace(
            `${redirectUrl}?otp=${data?.otp}&email=${data?.email}`,
          );
        } else {
          window.location.replace(loginUrl);
        }
      }, 200);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const queryFn = async ({
    callback,
    redirect = true,
  }: {
    callback?: string;
    redirect?: boolean;
  }) => {
    removeToken();
    queryClient.invalidateQueries(currentUserKey);
    if (redirect) {
      setTimeout(() => {
        window.location.replace(
          '/login' + (callback ? `?callback=${callback}` : ''),
        );
      }, 200);
    }
    return true;
  };

  return useMutation(queryFn);
}

export function useLoginByOtp(otp?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const errorToast = useToastMessage({ status: 'error' });

  const queryFn = async () => {
    const endpoint = `auth/login-client-by-otp/${otp}`;
    const res = await axios.post<LoginResponse>(endpoint);

    const token = res.data.data?.access_token;
    if (token) {
      removeToken();
      setToken(token, true);
      queryClient.invalidateQueries(currentUserKey);
    }

    return res.data.data;
  };

  return useMutation(queryFn, {
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      errorToast();
      router.push('/login');
    },
  });
}
