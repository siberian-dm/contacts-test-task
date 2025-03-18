import { createRoutesView } from 'atomic-router-react';

import { Main } from './main';
import { NotFound } from './not-found';
import { Forbidden } from './forbidden';
import { SignIn } from './sign-in';
import { SignOut } from './sign-out';

export const Routing = createRoutesView({
  routes: [SignIn, SignOut, Main, NotFound, Forbidden],
});
