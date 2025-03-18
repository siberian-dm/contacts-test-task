import { Button, Result } from 'antd';

import * as model from '../model';

export const ForbiddenPage: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => model.navigateToHome()}>
          Back home
        </Button>
      }
    />
  );
};
