import React from "react";
import { CompanyList } from "../../index";
import { Form, Input, Modal, Select } from "antd";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { createCompanyMutation } from "./hooks/useCreatecompanyMutation";
import { selectUsersGql } from "./hooks/useSelectUsersQuery";
import { SelectOptionWithAvatar } from "@/components/avatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/interfaces";

export const CreateCompany = () => {
  const go = useGo();

  const gotToListPage = () => {
    go({
      to: { resource: "companies", action: "list" },
      options: { keepQuery: true },
      type: "replace",
    });
  };
  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: gotToListPage,
    meta: {
      gqlMutation: createCompanyMutation,
    },
  });

  const { selectProps, query: queryResult } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: selectUsersGql,
    },
  });

  return (
    <CompanyList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={gotToListPage}
        title="Create Company"
        width={515}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Comapny name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please Enter company name" />
          </Form.Item>
          <Form.Item
            label="Sales owner"
            name="salesOwnerId"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Please select sales owner"
              {...selectProps}
              options={queryResult.data?.data.map((user: any) => ({
                value: user.id,
                label: (
                  <SelectOptionWithAvatar name={user.name} avatarUrl={user.avatarUrl ?? undefined} />
                )
              }))} 
            />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  );
};
