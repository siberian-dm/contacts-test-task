import { Typography, Input, Flex, TableColumnProps, Table, Button, Modal, Form, Spin } from 'antd';
import { useUnit } from 'effector-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useId } from 'react';

import { ContactResource } from '~/shared/api';

import * as model from '../model';

const columns: TableColumnProps<ContactResource>[] = [
  {
    dataIndex: 'full_name',
    title: 'Full name',
  },
  {
    dataIndex: 'phone',
    title: 'phone',
  },
  {
    dataIndex: 'email',
    title: 'Email',
  },
  {
    key: 'actions',
    title: 'Actions',
    render: (_, record) => {
      return (
        <Button type="primary" onClick={() => model.editClicked({ id: record.id })}>
          Edit
        </Button>
      );
    },
  },
];

export const MainPage: React.FC = () => {
  const { isLoading, contactsList, page, totalContacts } = useUnit({
    isLoading: model.$isContactsLoading,
    contactsList: model.$contactsList,
    page: model.$page,
    totalContacts: model.$totalContacts,
  });

  return (
    <Flex vertical gap={20}>
      <Flex justify="space-between">
        <Typography.Title level={2} style={{ margin: 0, fontSize: '20px', lineHeight: '24px' }}>
          Список контактов
        </Typography.Title>

        <Button onClick={() => model.addContactClicked()}>Add contact</Button>
      </Flex>

      <Table
        dataSource={contactsList}
        loading={isLoading}
        columns={columns}
        pagination={{
          pageSize: model.PAGE_LIMIT,
          current: page,
          total: totalContacts,
          onChange: (page) => model.pageChanged(page),
          showSizeChanger: false,
        }}
      />

      <CreateUpdateContactModal />
    </Flex>
  );
};

const CreateUpdateContactModal = () => {
  const { isOpen, editingContact, isFormLoading, isEditMode, isSaveContactLoading } = useUnit({
    isOpen: model.$isCreateContactOpen,
    isFormLoading: model.$isFormLoading,
    editingContact: model.$editingContact,
    isEditMode: model.$isEditMode,
    isSaveContactLoading: model.$isSaveContactLoading,
  });

  const title = isEditMode ? 'Edit' : 'Create';

  const formId = useId();

  const form = useForm({
    resolver: yupResolver(model.createContactSchema),
    defaultValues: {
      email: '',
      full_name: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (editingContact) {
      form.reset(editingContact);
    }
  }, [editingContact]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    const submit = form.handleSubmit((values) => {
      model.formValidated(values);
    });
    submit();
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={() => model.createContactCanceled()}
      okButtonProps={{
        htmlType: 'submit',
        form: formId,
        loading: isSaveContactLoading,
        disabled: form.formState.disabled,
      }}
      cancelButtonProps={{
        onClick: () => model.createContactCanceled(),
        disabled: isSaveContactLoading,
      }}
    >
      <Spin spinning={isFormLoading}>
        <form onSubmit={handleSubmit} id={formId}>
          <Flex vertical>
            <Controller
              control={form.control}
              name="full_name"
              render={({ field, fieldState }) => (
                <Form.Item
                  label="Name"
                  layout="vertical"
                  validateStatus={fieldState.error ? 'error' : 'success'}
                  help={fieldState.error?.message}
                >
                  <Input size="large" value={field.value} onChange={field.onChange} />
                </Form.Item>
              )}
            />

            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Form.Item
                  label="Email"
                  layout="vertical"
                  validateStatus={fieldState.error ? 'error' : 'success'}
                  help={fieldState.error?.message}
                >
                  <Input size="large" value={field.value} onChange={field.onChange} />
                </Form.Item>
              )}
            />

            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Form.Item
                  label="Phone"
                  layout="vertical"
                  validateStatus={fieldState.error ? 'error' : 'success'}
                  help={fieldState.error?.message}
                >
                  <Input size="large" value={field.value} onChange={field.onChange} />
                </Form.Item>
              )}
            />
          </Flex>
        </form>
      </Spin>
    </Modal>
  );
};
