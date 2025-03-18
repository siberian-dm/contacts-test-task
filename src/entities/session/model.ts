import { chainRoute, RouteInstance, RouteParams, RouteParamsAndQuery } from 'atomic-router';
import { createEffect, createEvent, createStore, EventCallable, merge, sample, split } from 'effector';
import { reshape } from 'patronum';

import { api, getApiErrorMsg, UserResource } from '~/shared/api';
import { routes } from '~/shared/config/routing';
import { localStorageService } from '~/shared/lib/local-storage-service';
import { notifyFx } from '~/shared/lib/notify';

enum SessionStatus {
  Initial,
  Pending,
  Authorized,
  UnAuthorized,
}

const loggedIn = createEvent();
const loggedOut = createEvent();

const $session = createStore(SessionStatus.Initial);

const sessionStatus = reshape({
  source: $session,
  shape: {
    $isInitial: (status) => status === SessionStatus.Initial,
    $isAuthorized: (status) => status === SessionStatus.Authorized,
    $isUnAuthorized: (status) => status === SessionStatus.UnAuthorized,
  },
});

const $user = createStore<UserResource | null>(null);

const sessionFx = createEffect(() => {
  return api.auth.getMe();
});

const setUserToLocalStorageFx = createEffect((user: UserResource) => {
  localStorageService.setUser(user);
});
const removeUserFromLocalStorageFx = createEffect(() => {
  localStorageService.removeUser();
});
const removeTokensFromStorageFx = createEffect(() => {
  localStorageService.removeTokens();
});

const authorized = sessionFx.doneData;
const notAuthorized = sessionFx.failData;

$session.reset([loggedOut, loggedIn]);
$user.on(sessionFx.doneData, (_, response) => response.data.user).reset([loggedOut]);

sample({
  clock: sessionFx.failData,
  filter: (error) => 'status' in error && error.status !== 401,
  fn: (error) => {
    return {
      type: 'error' as const,
      message: getApiErrorMsg(error),
    };
  },
  target: notifyFx,
});

sample({
  clock: sessionFx.failData,
  target: [removeUserFromLocalStorageFx, removeTokensFromStorageFx],
});

sample({
  clock: sessionFx,
  filter: sessionStatus.$isInitial,
  fn: () => SessionStatus.Pending,
  target: $session,
});

sample({
  clock: authorized,
  fn: () => SessionStatus.Authorized,
  target: $session,
});

sample({
  clock: authorized,
  fn: (response) => response.data.user,
  target: setUserToLocalStorageFx,
});

sample({
  clock: loggedOut,
  target: [removeUserFromLocalStorageFx, removeTokensFromStorageFx],
});

sample({
  clock: notAuthorized,
  fn: () => SessionStatus.UnAuthorized,
  target: $session,
});

type ChainOptions<Params extends RouteParams> = {
  route: RouteInstance<Params>;
  otherwise?: EventCallable<void>;
};

const chainAuthorized = <Params extends RouteParams>({ route, otherwise }: ChainOptions<Params>) => {
  const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const authCheckFailed = createEvent();

  const { alreadyAuthorized, alreadyAnonymous } = split(sample({ clock: authCheckStarted, source: sessionStatus }), {
    alreadyAuthorized: (session) => session.$isAuthorized,
    alreadyAnonymous: (status) => status.$isUnAuthorized,
  });

  const authCheckDone = merge([alreadyAuthorized, authorized]);

  sample({
    clock: authCheckStarted,
    filter: sessionStatus.$isInitial,
    target: sessionFx,
  });

  sample({
    clock: [alreadyAnonymous, notAuthorized],
    filter: route.$isOpened,
    target: authCheckFailed,
  });

  if (otherwise) {
    sample({
      clock: authCheckFailed,
      target: otherwise,
    });
  } else {
    sample({
      clock: [alreadyAnonymous, notAuthorized],
      filter: route.$isOpened,
      target: routes.signIn.open,
    });
  }

  return chainRoute({
    route,
    beforeOpen: authCheckStarted,
    openOn: authCheckDone,
    cancelOn: authCheckFailed,
  });
};

const chainAnonymous = <Params extends RouteParams>({ route, otherwise }: ChainOptions<Params>) => {
  const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const authCheckDone = createEvent();

  const { alreadyAuthorized, alreadyAnonymous } = split(sample({ clock: authCheckStarted, source: sessionStatus }), {
    alreadyAuthorized: (session) => session.$isAuthorized,
    alreadyAnonymous: (status) => status.$isUnAuthorized,
  });

  sample({
    clock: authCheckStarted,
    filter: sessionStatus.$isInitial,
    target: sessionFx,
  });

  sample({
    clock: [alreadyAuthorized, authorized],
    filter: route.$isOpened,
    target: authCheckDone,
  });

  if (otherwise) {
    sample({
      clock: authCheckDone,
      target: otherwise,
    });
  } else {
    sample({
      clock: [alreadyAuthorized, authorized],
      filter: route.$isOpened,
      target: routes.browse.open,
    });
  }

  return chainRoute({
    route,
    beforeOpen: authCheckStarted,
    openOn: [alreadyAnonymous, notAuthorized],
    cancelOn: authCheckDone,
  });
};

export default {
  $session,
  sessionStatus,
  sessionFx,
  chainAuthorized,
  chainAnonymous,
  loggedIn,
  loggedOut,
  $user,
  SessionStatus,
  authorized,
};
