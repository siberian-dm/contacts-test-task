import { createEffect, createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import * as yup from 'yup';

import { sessionModel } from '~/entities/session';
import { notifyFx } from '~/shared/lib/notify';
import { api, getApiErrorMsg } from '~/shared/api';
import { routes } from '~/shared/config/routing';
import { ACCESS_TOKEN_KEY } from '~/shared/config/local-storage';

sessionModel.chainAnonymous({ route: routes.signIn });

export type FormValues = yup.InferType<typeof schema>;

export const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const formValidated = createEvent<FormValues>();
export const signedIn = createEvent();
export const signedUp = createEvent();

export const $token = createStore<string | null>(null);
persist({ store: $token, key: ACCESS_TOKEN_KEY });

const signInFx = createEffect((payload: FormValues) => api.auth.login(payload));

const authorized = signInFx.doneData.map((data) => data.data.access_token);

export const $loading = signInFx.pending;

sample({
  source: formValidated,
  target: signInFx,
});

sample({
  clock: signInFx.failData,
  fn: (error) => ({
    type: 'error' as const,
    message: getApiErrorMsg(error),
  }),
  target: notifyFx,
});

sample({
  clock: authorized,
  target: [$token, sessionModel.loggedIn, routes.browse.open],
});
