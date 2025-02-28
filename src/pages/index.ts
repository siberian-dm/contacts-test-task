import { createRoutesView } from 'atomic-router-react';

import { Main } from './main';
import { NotFound } from './not-found';

export const Routing = createRoutesView({
  routes: [Main, NotFound],
});
