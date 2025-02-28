import { Button, Result } from 'antd';

import * as model from '../model';

export const NotFoundPage: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => model.navigateToHome()}>
          Back home
        </Button>
      }
    />
  );
};
