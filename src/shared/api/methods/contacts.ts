import { apiService } from '../api-service';
import type {
  ContactResource,
  GetContactListParams,
  GetContactByIdParams,
  CreateContactParams,
  UpdateContactParams,
  DeleteContactParams,
} from './types';

const BASE_URL = '/contacts';

export const getContactList = async (params?: GetContactListParams) => {
  const response = await apiService.api.instance.get<ContactResource[]>(BASE_URL, { params });
  return {
    data: response.data,
    meta: {
      total: +response.headers['x-total-count'],
    },
  };
};

export const getContactById = ({ id, ...params }: GetContactByIdParams) => {
  return apiService.api.instance.get<ContactResource>(`${BASE_URL}/${id}`, { params });
};

export const createContact = ({ data }: CreateContactParams) => {
  return apiService.api.instance.post<ContactResource>(BASE_URL, data);
};

export const updateContact = ({ id, data }: UpdateContactParams) => {
  return apiService.api.instance.put<ContactResource>(`${BASE_URL}/${id}`, data);
};

export const deleteContact = ({ id }: DeleteContactParams) => {
  return apiService.api.instance.delete<ContactResource>(`${BASE_URL}/${id}`);
};
