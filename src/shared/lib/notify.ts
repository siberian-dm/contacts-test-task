import { notification, NotificationArgsProps } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';
import { createEffect } from 'effector';

type NotifyType = Exclude<keyof NotificationInstance, 'open' | 'destroy'>;

type NotifyParams = {
  message: string;
  type?: NotifyType;
  options?: Omit<NotificationArgsProps, 'message'>;
};

export const notifyFx = createEffect((params: NotifyParams) => {
  const type: NotifyType = params.type ?? 'info';

  const options: NotificationArgsProps = {
    message: params.message,
    placement: 'topRight',
    ...params.options,
  };

  return notification[type](options);
});
