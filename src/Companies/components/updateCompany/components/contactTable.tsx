import { useParams } from "react-router-dom";
import { FilterDropdown, useTable } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import {
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Select, Space, Table } from "antd";
import { statusOptions } from "@/constants";
import { CompanyContactsTableQuery } from "@/graphql/types";
import { ContactStatusTag, CustomAvatar, Text } from "@/components";
import { companyContactsGql } from "../hooks/useCompanyContacts";

type Contact = GetFieldsFromList<CompanyContactsTableQuery>;

export const CompanyContactsTable = () => {
  const params = useParams();

  /**
   * Refine offers a TanStack Table adapter with @refinedev/react-table that allows us to use the TanStack Table library with Refine.
   * All features such as sorting, filtering, and pagination come out of the box
   * Under the hood it uses useList hook to fetch the data.
   * https://refine.dev/docs/packages/tanstack-table/use-table/#installation
   */
  const { tableProps } = useTable<Contact>({
    resource: "contacts",
    syncWithLocation: false,
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "jobTitle",
          value: "",
          operator: "contains",
        },
        {
          field: "name",
          value: "",
          operator: "contains",
        },
        {
          field: "status",
          value: undefined,
          operator: "in",
        },
      ],
      permanent: [
        {
          field: "company.id",
          operator: "eq",
          value: params?.id as string,
        },
      ],
    },
    meta: {
      gqlQuery: companyContactsGql,
    },
  });

  return (
    <Card
      styles={{
        header: { borderBottom: "1px solid #D9D9D9", marginBottom: "1px" },
        body: { padding: 0 }
      }}
      title={
        <Space size="middle">
          <TeamOutlined />
          <Text>Contacts</Text>
        </Space>
      }
      extra={
        <>
          <Text className="tertiary">Total contacts: </Text>
          <Text strong>
            {tableProps?.pagination !== false && tableProps.pagination?.total}
          </Text>
        </>
      }
    >
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: false,
        }}
      >
        <Table.Column<Contact>
          title="Name"
          dataIndex="name"
          render={(_, record) => (
            <Space>
              <CustomAvatar name={record.name} src={record.avatarUrl} />
              <Text
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {record.name}
              </Text>
            </Space>
          )}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Name" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          title="Title"
          dataIndex="jobTitle"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Title" />
            </FilterDropdown>
          )}
        />
        <Table.Column<Contact>
          title="Stage"
          dataIndex="status"
          render={(_, record) => <ContactStatusTag status={record.status} />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: "200px" }}
                mode="multiple"
                placeholder="Select Stage"
                options={statusOptions}
              ></Select>
            </FilterDropdown>
          )}
        />
        <Table.Column<Contact>
          dataIndex="id"
          width={112}
          render={(_, record) => (
            <Space>
              <Button
                size="small"
                href={`mailto:${record.email}`}
                icon={<MailOutlined />}
              />
              <Button
                size="small"
                href={`tel:${record.phone}`}
                icon={<PhoneOutlined />}
              />
            </Space>
          )}
        />
      </Table>
    </Card>
  );
};
