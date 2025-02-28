import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }

  #root {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;
