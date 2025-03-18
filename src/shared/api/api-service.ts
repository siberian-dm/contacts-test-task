import axios, { AxiosError, AxiosInstance } from 'axios';

import { API_URL, REFRESH_TOKEN_PATH, REQUEST_TIMEOUT, TOKEN_TYPE } from '../config/api';
import { localStorageService } from '../lib/local-storage-service';
import { router } from '../config/routing';

class ApiService {
  isAlreadyFetchingAccessToken = false;

  subscribers: Array<(token: string) => void> = [];

  constructor(public api: { instance: AxiosInstance }) {
    this.api.instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorageService.getAccessToken() ?? '';

        config.headers.Authorization = `${TOKEN_TYPE} ${accessToken}`;

        return config;
      },
      (error) => Promise.reject(error),
    );

    this.api.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { config, response } = error;
        const originalRequest = config;

        if (!(error instanceof AxiosError)) {
          return this.logout();
        }

        if (
          response &&
          response.status === 401 &&
          config.url !== REFRESH_TOKEN_PATH &&
          localStorageService.getRefreshToken()
        ) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then(
              (r) => {
                this.isAlreadyFetchingAccessToken = false;

                localStorageService.setAccessToken(r.data.accessToken);

                this.setDefaultAccessToken(r.data.accessToken);

                this.onAccessTokenFetched(r.data.accessToken);
              },
              () => {
                this.logout();
              },
            );
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken: string) => {
              originalRequest.headers.Authorization = `${TOKEN_TYPE} ${accessToken}`;
              resolve(this.api.instance(originalRequest));
            });
          });
          return retryOriginalRequest;
        } else if (response && response.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      },
    );
  }

  private onAccessTokenFetched(accessToken: string) {
    this.subscribers = this.subscribers.filter((callback) => callback(accessToken));
  }

  private addSubscriber(callback: (token: string) => void) {
    this.subscribers.push(callback);
  }

  private setDefaultAccessToken(accessToken: string) {
    this.api.instance.defaults.headers.common.Authorization = `${TOKEN_TYPE} ${accessToken}`;
  }

  public removeToken = () => {
    delete this.api.instance.defaults.headers.common.Authorization;
  };

  private refreshToken() {
    return this.api.instance.post(`${API_URL}/${REFRESH_TOKEN_PATH}`, {
      refresh_token: localStorageService.getRefreshToken(),
    });
  }

  private logout() {
    this.removeToken();

    router.push({
      path: '/sign-out',
      method: 'push',
      params: {},
      query: {},
    });
  }
}

const api = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
});

export const apiService = new ApiService({ instance: api });
