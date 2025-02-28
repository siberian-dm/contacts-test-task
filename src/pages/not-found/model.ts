import { createEvent, sample } from 'effector';

import { routes } from '~/shared/config/routing';

export const navigateToHome = createEvent();

sample({
  clock: navigateToHome,
  target: routes.browse.open,
});
