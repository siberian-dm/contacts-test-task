import { createHistoryRouter, createRoute, createRouterControls } from 'atomic-router';

export const routes = {
  browse: createRoute(),
  notFound: createRoute(),
};

export const routesMap = [
  {
    route: routes.browse,
    path: '/',
  },
];

export const routerControls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  controls: routerControls,
  notFoundRoute: routes.notFound,
});
