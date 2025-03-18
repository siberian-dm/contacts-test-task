import { Flex } from 'antd';

import { FullScreenLoader } from '~/shared/ui/full-screen-loader';

import './model';

export const SignOutPage = () => {
  return (
    <Flex
      style={{
        height: '100dvh',
        width: '100dvw',
      }}
    >
      <FullScreenLoader />
    </Flex>
  );
};
