import axios, { AxiosError, AxiosResponse } from "axios";
import QueryString from "qs";
import { useAuthStore } from "../store/useAuthStore";

type IRequestCb = (token: string) => void;

let isRefreshing = false;
const refreshSubscribers: IRequestCb[] = [];

const subscribeTokenRefresh = (cb: IRequestCb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
};

const axiosTenant = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  paramsSerializer: {
    serialize: (params) => {
      return QueryString.stringify(params, {
        arrayFormat: "indices",
        allowDots: true,
      });
    },
  },
});

// Add a request interceptor
axiosTenant.interceptors.request.use(
  function (config) {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
// Add a response interceptor
axiosTenant.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const { config } = error;
    const originalRequest = config;
    const {
      refreshToken: oldRefreshToken,
      token: oldAccessToken,
      setNewToken,
    } = useAuthStore.getState();

    if (error.response?.status === 401) {
      if (!oldRefreshToken) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Get Refresh token
          // const res = await AuthService.refreshToken({
          //   refreshToken: oldRefreshToken,
          //   accessToken: oldAccessToken,
          // });
          // const { refreshToken, accessToken } = res.data.data;
          const { refreshToken, accessToken } = {
            refreshToken: "oldRefreshToken",
            accessToken: "oldAccessToken",
          };

          setNewToken({
            token: accessToken,
            refreshToken,
          });
          if (originalRequest.headers) {
            originalRequest.headers.authorization = `Bearer ${accessToken}`;
            // set new token
            onRefreshed(accessToken);

            return axios(originalRequest);
          }
        } catch (error) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken: string) => {
          // replace the expired token and retry
          if (originalRequest.headers) {
            originalRequest.headers.authorization = `Bearer ${newToken}`;
          }
          resolve(axios(originalRequest));
        });
      });
    }

    if (axios.isAxiosError(error)) {
      if (error.code === AxiosError.ERR_NETWORK) {
        return Promise.reject("ERR_NETWORK_MSG");
      }
    }
    return Promise.reject(error);
  },
);

export default axiosTenant;
