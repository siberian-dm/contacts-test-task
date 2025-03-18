import { UserResource } from '../api';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '../config/local-storage';

const setItemSafely = (key: string, payload: unknown): void => {
  localStorage.setItem(key, JSON.stringify(payload));
};

const getParsedItem = <T extends string | null>(key: string): T => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '');
  } catch {
    return localStorage.getItem(key) as T;
  }
};

class LocalStorageService {
  setAccessToken(token: string) {
    setItemSafely(ACCESS_TOKEN_KEY, token);
  }

  getAccessToken() {
    return <string | null>getParsedItem(ACCESS_TOKEN_KEY);
  }

  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  setRefreshToken(token: string) {
    setItemSafely(REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken() {
    return getParsedItem(REFRESH_TOKEN_KEY);
  }

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  setUser(user: UserResource) {
    setItemSafely(USER_KEY, user);
  }

  getUser(): UserResource | null {
    return <UserResource | null>getParsedItem(USER_KEY);
  }

  removeUser() {
    localStorage.removeItem(USER_KEY);
  }

  removeTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

export const localStorageService = new LocalStorageService();
