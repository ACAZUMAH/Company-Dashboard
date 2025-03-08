import type { CompaniesListQuery } from "@/interfaces/graphql/types";
import { useTable } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import  { GetFieldsFromList } from "@refinedev/nestjs-query";
import gql from "graphql-tag";

export const companiesListGql = gql`
  query CompaniesList(
    $filter: CompanyFilter!
    $sorting: [CompanySort!]
    $paging: OffsetPaging!
  ) {
    companies(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        # Get the sum of all deals in this company
        dealsAggregate {
          sum {
            value
          }
        }
      }
    }
  }
`;

export const useFetchCompaniesList = (searchValue?: string) => {
  const { tableProps, filters } = useTable<
    GetFieldsFromList<CompaniesListQuery>,
    HttpError,
    GetFieldsFromList<CompaniesListQuery>
  >({
    resource: "companies",
    onSearch: (values: any) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: searchValue || values.name,
        },
      ];
    },
    pagination: { pageSize: 12 },
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    filters: {
      initial: [{ field: "name", operator: "contains", value: undefined }],
    },
    meta: {
      gqlQuery: companiesListGql,
    },
  });

  return { tableProps, filters };
};
