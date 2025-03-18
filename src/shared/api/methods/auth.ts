import { apiService } from '../api-service';
import type { UserCredentials, LoginResponseData, UserResource } from './types';

export const login = async (payload: UserCredentials) => {
  const response = await apiService.api.instance.post<LoginResponseData>(`/login`, payload);
  return {
    data: response.data,
  };
};

export const getMe = async () => {
  const response = await apiService.api.instance.get<{ user: UserResource }>(`/get-me`);
  return {
    data: response.data,
  };
};
