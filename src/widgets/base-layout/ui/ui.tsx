import { Flex, theme, Typography } from 'antd';
import { Notebook } from 'lucide-react';

import { DmedLogo } from '~/shared/ui/svg';

import * as S from './styles';

export const BaseLayout = ({ children }: React.PropsWithChildren) => {
  const { token } = theme.useToken();
  return (
    <S.Layout>
      <S.Header>
        <Flex gap={token.marginXS} align="center">
          <Notebook size="32px" />
          <Typography.Title style={{ margin: 0, fontSize: '24px', lineHeight: '24px', fontWeight: 700 }}>
            Contacts
          </Typography.Title>
        </Flex>
      </S.Header>

      <S.Content>
        <S.ContentInner>{children}</S.ContentInner>
      </S.Content>

      <S.Footer>
        <DmedLogo width="82px" /> <span>©{new Date().getFullYear()} Created by DMED team</span>
      </S.Footer>
    </S.Layout>
  );
};
