import { BaseLayout } from '~/widgets/base-layout';
import { routes } from '~/shared/config/routing';
import { withSuspense } from '~/shared/ui/with-suspense';

import { MainPage } from './ui';

export const Main = {
  route: routes.browse,
  view: withSuspense(MainPage),
  layout: BaseLayout,
};
