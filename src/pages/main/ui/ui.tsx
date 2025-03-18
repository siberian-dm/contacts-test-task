import { Typography } from 'antd';

import '../model';

export const MainPage: React.FC = () => {
  return (
    <div>
      <Typography.Title level={2} style={{ margin: 0, fontSize: '20px', lineHeight: '24px' }}>
        Список контактов
      </Typography.Title>
    </div>
  );
};
