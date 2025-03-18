export type TagResource = {
  id: number;
  title: string;
};

export type ContactResource = {
  id: number;
  avatar?: string;
  full_Name: string;
  phone: string;
  email: string;
  tags?: TagResource[];
};

export type UserResource = {
  id: number;
  name: string;
  email: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: UserResource;
  access_token: string;
  refresh_token: string;
};

export type GetContactListParams = {
  name?: string;
  _page?: number;
  _limit?: number;
  _sort?: 'id' | 'fullName';
  _order?: 'asc' | 'desc';
  q?: string;
};

export type GetContactByIdParams = {
  id: number;
};

export type CreateContactParams = {
  data: Omit<ContactResource, 'id'>;
};

export type UpdateContactParams = {
  id: number;
  data: Partial<ContactResource>;
};

export type DeleteContactParams = {
  id: number;
};
