import { Typography, Input, Button, Flex, Form, theme } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUnit } from 'effector-react';

import * as model from '../model';

export const SignInPage: React.FC = () => {
  const [loading] = useUnit([model.$loading]);
  const { token } = theme.useToken();

  const form = useForm({
    resolver: yupResolver(model.schema),
    defaultValues: {
      email: 'johndoe@example.com',
    },
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    const submit = form.handleSubmit((values) => {
      form.reset(values);
      model.formValidated(values);
    });
    submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography.Title level={3} style={{ margin: 0, textAlign: 'center' }}>
        Авторизация
      </Typography.Title>

      <Flex vertical gap={token.marginLG} style={{ marginTop: token.marginLG }}>
        <div>
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Form.Item
                label="Имя пользователя"
                layout="vertical"
                validateStatus={fieldState.error ? 'error' : 'success'}
                help={fieldState.error?.message}
              >
                <Input disabled={loading} size="large" value={field.value} onChange={field.onChange} />
              </Form.Item>
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Form.Item
                label="Пароль"
                layout="vertical"
                validateStatus={fieldState.error ? 'error' : 'success'}
                help={fieldState.error?.message}
              >
                <Input.Password disabled={loading} size="large" value={field.value} onChange={field.onChange} />
              </Form.Item>
            )}
          />
        </div>

        <Button
          disabled={!form.formState.isDirty || Object.values(form.formState.errors).length > 0}
          loading={loading}
          size="large"
          htmlType="submit"
          type="primary"
        >
          Войти
        </Button>
      </Flex>
    </form>
  );
};
