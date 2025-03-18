import { BaseLayout } from '~/widgets/base-layout';
import { routes } from '~/shared/config/routing';
import { withSuspense } from '~/shared/ui/with-suspense';

import { ForbiddenPage } from './ui';

export const Forbidden = {
  view: withSuspense(ForbiddenPage),
  route: routes.forbidden,
  layout: BaseLayout,
};
