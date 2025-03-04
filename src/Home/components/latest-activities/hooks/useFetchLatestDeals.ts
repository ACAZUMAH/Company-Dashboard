import { useList } from "@refinedev/core";
import gql from "graphql-tag";

const latestActivitiesDeals = gql`
  query DashboardLatestActivitiesDeals(
    $filter: DealFilter!
    $sorting: [DealSort!]
    $paging: OffsetPaging
  ) {
    deals(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        stage {
          id
          title
        }
        company {
          id
          name
          avatarUrl
        }
        createdAt
      }
    }
  }
`;

export const useFetchLatestActivitiesDeals = (dealsIds: string[] | undefined) => {
    const { data , isLoading: isLoadingDeals } = useList({
        resource: 'deals',
        queryOptions: { enabled: !!dealsIds?.length},
        pagination: {
            mode: 'off'
        },
        filters: [{ field: 'id', operator: 'in', value: dealsIds }],
        meta: {
            gqlQuery: latestActivitiesDeals
        }
    })

    return { data, isLoadingDeals }
}