import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';

export const routes = {
  browse: createRoute(),
  signIn: createRoute(),
  signOut: createRoute(),
  notFound: createRoute(),
  forbidden: createRoute(),
};

export const routesMap = [
  {
    route: routes.browse,
    path: '/',
  },
  {
    route: routes.signIn,
    path: '/sign-in',
  },
  {
    route: routes.signOut,
    path: '/sign-out',
  },
  {
    route: routes.forbidden,
    path: '/forbidden',
  },
];

export const routerControls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  controls: routerControls,
  notFoundRoute: routes.notFound,
});
