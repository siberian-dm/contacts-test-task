import { Avatar, Flex, theme, Typography, Dropdown } from 'antd';
import { Notebook, UserIcon } from 'lucide-react';
import { useUnit } from 'effector-react';

import { sessionModel } from '~/entities/session';
import { DmedLogo } from '~/shared/ui/svg';

import * as S from './styles';

export const BaseLayout = ({ children }: React.PropsWithChildren) => {
  const { token } = theme.useToken();

  const { user } = useUnit({
    user: sessionModel.$user,
  });

  return (
    <S.Layout>
      <S.Header>
        <Flex gap={token.marginXS} align="center" justify="space-between" style={{ width: '100%' }}>
          <Flex>
            <Notebook size="32px" />
            <Typography.Title style={{ margin: 0, fontSize: '24px', lineHeight: '24px', fontWeight: 700 }}>
              Contacts
            </Typography.Title>
          </Flex>

          <Flex align="center" gap={10}>
            {user?.name}
            <Dropdown
              menu={{
                items: [{ key: '2', label: 'Logout', onClick: () => sessionModel.loggedOut() }],
                triggerSubMenuAction: 'click',
              }}
            >
              <Avatar icon={<UserIcon />}></Avatar>
            </Dropdown>
          </Flex>
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
