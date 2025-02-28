import { Flex, Spin } from 'antd';

type Props = {
  fullscreen?: boolean;
};

export const FullScreenLoader = ({ fullscreen }: Props) => {
  return (
    <Flex flex={1} justify="center" align="center">
      <Spin size="large" fullscreen={fullscreen} />
    </Flex>
  );
};
