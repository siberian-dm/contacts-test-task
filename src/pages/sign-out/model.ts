import { sample } from 'effector';

import { sessionModel } from '~/entities/session';
import { routes } from '~/shared/config/routing';

const authorizedRoute = sessionModel.chainAuthorized({ route: routes.signOut });

sample({
  clock: authorizedRoute.opened,
  target: [sessionModel.loggedOut, routes.signIn.open],
});
