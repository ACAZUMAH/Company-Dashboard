import React from 'react'
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/constants";
import CustomAvatar from "@/components/avatar/avatar";
import { getNameInitials } from "@/helpers";
import { SelectOptionWithAvatar } from "@/components/avatar";
import { Form, Input, InputNumber, Select } from "antd";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { updateCompanyMutationGql } from "../hooks/useUpdateCompany";

import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { selectUsersGql } from "../../createCompany/hooks/useSelectUsersQuery";
import { UsersSelectQuery } from "@/graphql/types";


export const UpdateForm = () => {
      const {
        saveButtonProps,
        formProps,
        formLoading,
        query: queryResult,
      } = useForm({
        redirect: false,
        meta: {
          gqlMutation: updateCompanyMutationGql,
        },
      });

      const { avatarUrl, name } = queryResult?.data?.data || {};

      const { selectProps: selectPropsUsers, query: queryResultUsers } =
        useSelect<GetFieldsFromList<UsersSelectQuery>>({
          resource: "users",
          optionLabel: "name",
          pagination: { mode: "off" },
          meta: {
            gqlQuery: selectUsersGql,
          },
        });
  return (
    <>
      <Edit
        isLoading={formLoading}
        saveButtonProps={saveButtonProps}
        breadcrumb={false}
      >
        <Form {...formProps} layout="vertical">
          <CustomAvatar
            shape="square"
            src={avatarUrl}
            name={getNameInitials(name || "")}
            style={{ width: 96, height: 96, marginBottom: "24px" }}
          />
          <Form.Item
            label="Sales owner"
            name="salesOwnerId"
            initialValue={formProps?.initialValues?.salesOwner?.id}
          >
            <Select
              placeholder="Please select sales owner"
              {...selectPropsUsers}
              options={
                queryResultUsers.data?.data?.map(({ id, name, avatarUrl }) => ({
                  value: id,
                  label: (
                    <SelectOptionWithAvatar
                      name={name}
                      avatarUrl={avatarUrl ?? undefined}
                    />
                  ),
                })) ?? []
              }
            />
          </Form.Item>
          <Form.Item>
            <Select options={companySizeOptions} />
          </Form.Item>
          <Form.Item>
            <InputNumber autoFocus addonBefore="$" min={0} placeholder="0,00" />
          </Form.Item>
          <Form.Item label="Industry">
            <Select options={industryOptions} />
          </Form.Item>
          <Form.Item label="Business type">
            <Select options={businessTypeOptions} />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item label="Website" name="website">
            <Input placeholder="Website" />
          </Form.Item>
        </Form>
      </Edit>
    </>
  );
}
