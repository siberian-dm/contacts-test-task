import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'atomic-router-react';
import { ThemeProvider } from 'styled-components';

import { Routing } from '~/pages';
import { router } from '~/shared/config/routing';
import { appStarted } from '~/shared/config/system';

import { GlobalStyle } from './global-style';

import './model';

appStarted();

export const App = () => {
  const { token } = theme.useToken();

  return (
    <ConfigProvider>
      <ThemeProvider theme={{ token: token }}>
        <GlobalStyle />
        <RouterProvider router={router}>
          <Routing />
        </RouterProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};
