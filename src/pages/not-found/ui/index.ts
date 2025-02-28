import { BaseLayout } from '~/widgets/base-layout';
import { routes } from '~/shared/config/routing';
import { withSuspense } from '~/shared/ui/with-suspense';

import { NotFoundPage } from './ui';

export const NotFound = {
  view: withSuspense(NotFoundPage),
  route: routes.notFound,
  layout: BaseLayout,
};
