import { DashboardTotalCountsQuery } from "@/interfaces";
import { useCustom } from "@refinedev/core";
import gql from "graphql-tag";

export const getTotalCounts = gql`
  query DashboardTotalCounts {
    companies {
      totalCount
    }
    contacts {
      totalCount
    }
    deals {
      totalCount
    }
  }
`;

export const useGetTotalCounts = () => {
    const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
        url: '',
        method: 'get',
        meta: {
            gqlQuery: getTotalCounts
        }
    })

    return { data, isLoading }
}
