import dayjs from 'dayjs';
import { createEffect, sample } from 'effector';
import { createBrowserHistory } from 'history';
import ru from 'dayjs/locale/ru';

import { router } from '~/shared/config/routing';
import { appStarted } from '~/shared/config/system';
import { API_URL } from '~/shared/config/api';

dayjs.locale(ru);

const keys = {
  API_URL,
};

const isNotGivenAllKeys = Object.values(keys).some((key) => !key);

const showNotGivenKeyErrorFx = createEffect(() => {
  for (const key in keys) {
    const value = keys[key];
    // eslint-disable-next-line no-console
    !value && console.error(`Key ${key} is not given`);
  }
});

const createBrowserHistoryFx = createEffect(() => createBrowserHistory());

sample({
  clock: appStarted,
  filter: () => isNotGivenAllKeys,
  target: showNotGivenKeyErrorFx,
});

sample({
  clock: appStarted,
  target: createBrowserHistoryFx,
});

sample({
  clock: createBrowserHistoryFx.doneData,
  target: router.setHistory,
});
