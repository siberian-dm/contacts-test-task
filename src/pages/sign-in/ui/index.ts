import { AuthLayout } from '~/widgets/auth-layout';
import { routes } from '~/shared/config/routing';
import { withSuspense } from '~/shared/ui/with-suspense';

import { SignInPage } from './ui';

export const SignIn = {
  route: routes.signIn,
  view: withSuspense(SignInPage),
  layout: AuthLayout,
};
