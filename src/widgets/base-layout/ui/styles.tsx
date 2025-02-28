import { Layout as BaseLayout } from 'antd';
import styled from 'styled-components';

export const Layout = styled(BaseLayout)`
  align-items: center;
  gap: ${(props) => props.theme.token.marginLG}px;
  height: auto;
  min-height: 100vh;
`;

export const Header = styled(BaseLayout.Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${(props) => props.theme.token.margin}px;
  background-color: ${(props) => props.theme.token.colorBgContainer};
  width: 100%;
`;

export const Content = styled(BaseLayout.Content)`
  padding: 0 48px;
  width: 100%;
`;

export const ContentInner = styled.div`
  padding: 24px;
  border-radius: ${(props) => props.theme.token.borderRadiusLG}px;
  background-color: ${(props) => props.theme.token.colorBgContainer};
`;

export const Footer = styled(BaseLayout.Footer)`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.token.marginXS}px;
`;
