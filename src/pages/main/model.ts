import { createEffect, createStore, sample, attach, createEvent } from 'effector';
import { spread, not, pending } from 'patronum';
import * as yup from 'yup';

import { sessionModel } from '~/entities/session';
import { api, ContactResource, CreateContactParams, GetContactListParams, UpdateContactParams } from '~/shared/api';
import { routes } from '~/shared/config/routing';

export const PAGE_LIMIT = 10;

export const createContactSchema = yup.object().shape({
  email: yup.string().required(),
  full_name: yup.string().required(),
  phone: yup.string().required(),
});

type CreateContactValues = yup.InferType<typeof createContactSchema>;

const protectedRoute = sessionModel.chainAuthorized({ route: routes.browse });

export const $contactsList = createStore<ContactResource[]>([]);
export const $page = createStore(1);
export const $totalContacts = createStore(0);

export const $editingContact = createStore<ContactResource | null>(null);
export const $isEditMode = createStore(false);

export const $isCreateContactOpen = createStore(false);

export const pageChanged = createEvent<number>();

export const addContactClicked = createEvent();
export const createContactCanceled = createEvent();
export const formValidated = createEvent<CreateContactValues>();

export const editClicked = createEvent<{ id: number }>();

const getContactListFx = createEffect(async (params: GetContactListParams) => {
  return await api.contacts.getContactList(params);
});
const getContactByIdFx = createEffect(async (params: { id: number }) => {
  return await api.contacts.getContactById(params);
});
const createContactFx = createEffect(async (params: CreateContactParams) => {
  return await api.contacts.createContact(params);
});
const updateContactFx = createEffect(async (params: UpdateContactParams) => {
  return await api.contacts.updateContact(params);
});

const getContactsFx = attach({
  source: {
    page: $page,
  },
  effect: getContactListFx,
  mapParams: (_: void, { page }) => {
    return {
      _page: page,
      _limit: PAGE_LIMIT,
    };
  },
});

export const $isContactsLoading = getContactsFx.pending;

export const $isSaveContactLoading = pending([createContactFx, updateContactFx]);
export const $isFormLoading = getContactByIdFx.pending;

sample({
  clock: protectedRoute.opened,
  target: getContactsFx,
});

sample({
  clock: getContactsFx.doneData,
  fn: ({ data, meta }) => ({
    list: data,
    total: meta.total,
  }),
  target: spread({
    list: $contactsList,
    total: $totalContacts,
  }),
});

sample({
  clock: pageChanged,
  target: [$page, getContactsFx],
});

$isCreateContactOpen.on(addContactClicked, () => true);

$isCreateContactOpen.on(createContactCanceled, () => false);

sample({
  clock: formValidated,
  filter: not($isEditMode),
  fn: (values) => ({ data: values }),
  target: createContactFx,
});

sample({
  clock: formValidated,
  source: editClicked,
  filter: $isEditMode,
  fn: ({ id }, values) => ({ data: values, id }),
  target: updateContactFx,
});

sample({
  clock: [createContactFx.done, updateContactFx.done],
  fn: () => false,
  target: [$isCreateContactOpen, getContactsFx],
});

sample({
  clock: editClicked,
  target: getContactByIdFx,
});

$isCreateContactOpen.on(editClicked, () => true);

$isEditMode.on(editClicked, () => true);
$isEditMode.on(createContactCanceled, () => false);

sample({
  clock: getContactByIdFx.doneData,
  fn: ({ data }) => data,
  target: $editingContact,
});
