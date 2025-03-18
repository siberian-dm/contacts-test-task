import { routes } from '~/shared/config/routing';
import { withSuspense } from '~/shared/ui/with-suspense';

import { SignOutPage } from './ui';

export const SignOut = {
  route: routes.signOut,
  view: withSuspense(SignOutPage),
};
